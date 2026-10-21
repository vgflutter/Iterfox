import { execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

interface ProcessIdentity {
  pid: number;
  ppid: number;
  group: number;
  status: string;
  born: string;
}
function snapshot(): Map<number, ProcessIdentity> {
  const output = execFileSync('/bin/ps', ['-axo', 'pid=,ppid=,pgid=,stat=,lstart='], {
    encoding: 'utf8',
    timeout: 2000,
    maxBuffer: 8 * 1024 * 1024,
  });
  return new Map(
    output
      .trim()
      .split('\n')
      .map((line) => {
        const m = line.trim().match(/^(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(.+)$/);
        if (!m) throw new Error('Cannot inspect the owned Codex process tree');
        const p = {
          pid: Number(m[1]),
          ppid: Number(m[2]),
          group: Number(m[3]),
          status: m[4],
          born: m[5].trim(),
        };
        return [p.pid, p];
      }),
  );
}
function live(p?: ProcessIdentity): p is ProcessIdentity {
  return !!p && !p.status.startsWith('Z');
}

/** Track owned descendants as well as the original group: shell tools can
 * create their own groups. A changed PID birth identity is never signalled.
 * This is lifecycle supervision, not containment against malicious daemons. */
export class SessionProcesses {
  private owned = new Map<number, ProcessIdentity>();
  private timer?: ReturnType<typeof setInterval>;
  private failed = false;
  constructor(private root: number) {
    this.inspect();
    this.timer = setInterval(() => {
      try {
        this.inspect();
      } catch {
        this.failed = true;
      }
    }, 100);
    this.timer.unref();
  }
  inspect(): Map<number, ProcessIdentity> {
    const all = snapshot();
    if (!this.owned.size && all.has(this.root)) this.owned.set(this.root, all.get(this.root)!);
    let added: boolean;
    do {
      added = false;
      for (const p of all.values()) {
        const parent = this.owned.get(p.ppid);
        if (
          !this.owned.has(p.pid) &&
          (p.group === this.root || (parent && all.get(parent.pid)?.born === parent.born))
        ) {
          this.owned.set(p.pid, p);
          added = true;
        }
      }
    } while (added);
    return all;
  }
  async join(): Promise<boolean> {
    if (this.timer) clearInterval(this.timer);
    try {
      // Freeze known ancestors before the final census so a shell tool cannot
      // fork new writers between discovery and termination.
      for (let pass = 0; pass < 3; pass++) {
        const all = this.inspect();
        for (const p of this.owned.values()) {
          if (live(all.get(p.pid)) && all.get(p.pid)!.born === p.born) this.signal(p, 'SIGSTOP');
        }
      }
      const all = this.inspect();
      for (const p of [...this.owned.values()].reverse()) {
        if (live(all.get(p.pid)) && all.get(p.pid)!.born === p.born) {
          this.signal(p, 'SIGTERM');
          this.signal(p, 'SIGCONT');
        }
      }
      const killAt = Date.now() + 500;
      const deadline = Date.now() + 5000;
      while (Date.now() < deadline) {
        const current = this.inspect();
        const remaining = [...this.owned.values()].filter(
          (p) => live(current.get(p.pid)) && current.get(p.pid)!.born === p.born,
        );
        if (!remaining.length) return !this.failed;
        if (Date.now() >= killAt) for (const p of remaining) this.signal(p, 'SIGKILL');
        await delay(25);
      }
    } catch {
      this.failed = true;
    }
    // Failed observation cannot authorize another writer. Best-effort cleanup
    // is restricted to the original group created for this session.
    try {
      process.kill(-this.root, 'SIGKILL');
    } catch {
      /* already exited */
    }
    return false;
  }
  private signal(p: ProcessIdentity, signal: NodeJS.Signals) {
    try {
      process.kill(p.pid, signal);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ESRCH') throw e;
    }
  }
}
