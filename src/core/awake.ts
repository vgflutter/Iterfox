import { spawn } from 'node:child_process';

// The helper is scoped to the worker PID. It inhibits idle sleep, not explicit sleep/shutdown.
export async function keepWorkerAwake(record: (message: string) => void): Promise<() => void> {
  if (process.platform !== 'darwin') return () => {};
  const child = spawn('/usr/bin/caffeinate', ['-i', '-w', String(process.pid)], {
    stdio: 'ignore',
  });
  let closing = false;
  const started = await new Promise<boolean>((resolve) => {
    child.once('spawn', () => resolve(true));
    child.once('error', () => resolve(false));
  });
  if (started) {
    record(
      'macOS idle sleep inhibition requested for this worker PID. Explicit sleep, shutdown and power loss still interrupt the run.',
    );
    child.once('exit', () => {
      if (!closing)
        record(
          'The macOS awake helper exited. Keep the Mac awake manually while this worker runs.',
        );
    });
  } else
    record(
      'The macOS awake helper could not start. Keep the Mac awake manually while this worker runs.',
    );
  return () => {
    closing = true;
    if (started) child.kill();
  };
}
