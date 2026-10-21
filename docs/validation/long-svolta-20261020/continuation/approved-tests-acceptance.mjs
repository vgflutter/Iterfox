import assert from 'node:assert/strict';
import {appTest} from './harness.mjs';
import {browserCheck} from './browser.mjs';

const criterion=process.argv[2];
let groups=0;
async function check(name,fn){await fn();groups++;console.log('PASS '+name)}
const apiChecks={
  async 'projects-api'(x){
    const{api,project,invalid}=x;
    await check('empty archive',async()=>assert.deepEqual(await api('/api/projects'),[]));
    const p=await project('  Studio Caffè  ');
    await check('create project with stable defaults',async()=>{assert(p.id);assert.equal(p.name,'Studio Caffè');assert.equal(p.revision,1);assert.equal(p.archived,false)});
    const edited=await api('/api/projects/'+p.id,'PATCH',{revision:p.revision,name:'Studio rivisto'});
    await check('optimistic project edit',async()=>{assert.equal(edited.name,'Studio rivisto');assert.equal(edited.revision,p.revision+1);await api('/api/projects/'+p.id,'PATCH',{revision:p.revision,name:'Sovrascrittura persa'},409);assert.equal((await api('/api/projects'))[0].name,'Studio rivisto')});
    await check('invalid names and missing revisions do not write',async()=>{for(const name of ['', '   ',7,'x'.repeat(101)])await invalid('/api/projects',{name});await invalid('/api/projects/'+p.id,{name:'Senza revisione'},'PATCH');assert.equal((await api('/api/projects')).length,1)});
    await api('/api/projects/'+p.id,'PATCH',{revision:edited.revision,archived:true});
    await check('project archival survives restart',async()=>{await x.restart();const all=await api('/api/projects');assert.equal(all.length,1);assert.equal(all[0].archived,true);assert.equal(all[0].name,'Studio rivisto')});
    await check('unknown project does not create a record',async()=>{await api('/api/projects/missing-id','PATCH',{revision:1,name:'Nessuno'},404);assert.equal((await api('/api/projects')).length,1)});
  },
  async 'tasks-api'(x){
    const{api,project,task,invalid}=x;const p=await project('Personale');const q=await project('Casa');
    const a=await task(p.id,'  Preparare Caffè  ',{notes:'Studiare il PROGETTO',dueDate:'2026-10-20',estimateMinutes:25});const b=await task(q.id,'Comprare taccuino');
    await check('task defaults and exact fields',async()=>{assert(a.id);assert.equal(a.title,'Preparare Caffè');assert.equal(a.status,'todo');assert.equal(a.revision,1);assert.equal(a.archived,false);assert.equal(b.notes,'');assert.equal(b.dueDate,null);assert.equal(b.estimateMinutes,0)});
    const next=await api('/api/tasks/'+a.id,'PATCH',{revision:a.revision,status:'doing',title:'Preparare caffè buono'});
    await check('task edit, revision conflicts and combined filters',async()=>{assert.equal(next.revision,2);await api('/api/tasks/'+a.id,'PATCH',{revision:1,title:'Perso'},409);const list=await api('/api/tasks?projectId='+p.id+'&status=doing&q=progetto');assert.deepEqual(list.map(t=>t.id),[a.id]);assert.equal((await api('/api/tasks?q=CAFF%C3%88'))[0].id,a.id);assert.equal((await api('/api/tasks?projectId='+q.id)).length,1)});
    await check('civil dates, invalid states and numeric validation',async()=>{for(const extra of [{title:''},{title:'x'.repeat(161)},{notes:'x'.repeat(4001)},{dueDate:'2026-02-29'},{dueDate:'2026-04-31'},{dueDate:'2026-1-01'},{estimateMinutes:-1},{estimateMinutes:1.5},{estimateMinutes:10081}])await invalid('/api/tasks',{projectId:p.id,title:'Invalid',...extra});await invalid('/api/tasks/'+a.id,{revision:2,status:'invented'},'PATCH');await task(p.id,'Data bisestile',{dueDate:'2028-02-29'});assert.equal((await api('/api/tasks')).length,3)});
    await check('parallel stale writers cannot overwrite each other',async()=>{const res=await Promise.all(['Prima modifica','Seconda modifica'].map(title=>fetch(x.origin+'/api/tasks/'+a.id,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({revision:2,title})})));assert.deepEqual(res.map(r=>r.status).sort(),[200,409]);const current=(await api('/api/tasks')).find(t=>t.id===a.id);assert.equal(current.revision,3);assert(['Prima modifica','Seconda modifica'].includes(current.title))});
    await check('archived projects disappear from general activity list',async()=>{await api('/api/projects/'+q.id,'PATCH',{revision:q.revision,archived:true});assert(!(await api('/api/tasks')).some(t=>t.id===b.id));await invalid('/api/tasks',{projectId:q.id,title:'No archive write'});await invalid('/api/tasks',{projectId:'missing',title:'Unknown project'})});
    await check('task persistence and malformed JSON',async()=>{const before=await api('/api/tasks');await x.restart();assert.deepEqual(await api('/api/tasks'),before);const r=await fetch(x.origin+'/api/tasks',{method:'POST',headers:{'content-type':'application/json'},body:'{broken'});assert(r.status>=400&&r.status<500);assert.deepEqual(await api('/api/tasks'),before)});
  },
  async 'planning-api'(x){
    const{api,project,task,invalid}=x;const p=await project('Studio');const q=await project('Casa');
    const a=await task(p.id,'Leggere',{dueDate:'2026-10-20'});const overdue=await task(p.id,'Arretrata',{dueDate:'2026-10-18'});const done=await task(p.id,'Finita',{dueDate:'2026-10-24'});const loose=await task(p.id,'Da pianificare');const later=await task(q.id,'Prossima',{dueDate:'2026-10-26'});
    await api('/api/tasks/'+a.id,'PATCH',{revision:1,status:'doing'});await api('/api/tasks/'+done.id,'PATCH',{revision:1,status:'done'});
    await check('civil seven-day plan and unscheduled work',async()=>{const week=await api('/api/week?start=2026-10-19');assert.equal(week.start,'2026-10-19');assert.deepEqual(week.days.map(d=>d.date),['2026-10-19','2026-10-20','2026-10-21','2026-10-22','2026-10-23','2026-10-24','2026-10-25']);assert.deepEqual(week.days[1].tasks.map(t=>t.id),[a.id]);assert.equal(week.days[5].tasks[0].status,'done');assert.deepEqual(week.unscheduled.map(t=>t.id),[loose.id]);assert(!week.days.flatMap(d=>d.tasks).some(t=>[overdue.id,later.id].includes(t.id)))});
    await check('Monday and impossible-date rejection',async()=>{for(const start of ['2026-10-20','2026-02-30','not-a-date']){const r=await fetch(x.origin+'/api/week?start='+start);assert(r.status>=400&&r.status<500)}const year=await api('/api/week?start=2026-12-28');assert.equal(year.days[6].date,'2027-01-03')});
    const first=await api('/api/time-entries','POST',{taskId:a.id,date:'2026-10-20',minutes:25,note:'Prima sessione'},201);await api('/api/time-entries','POST',{taskId:later.id,date:'2026-10-21',minutes:35},201);await api('/api/time-entries','POST',{taskId:a.id,date:'2026-10-26',minutes:99},201);
    await check('time records preserve links and task status',async()=>{assert.equal(first.taskId,a.id);assert.equal(first.projectId,p.id);assert.equal(first.minutes,25);assert.equal((await api('/api/time-entries?taskId='+a.id)).length,2);assert.equal((await api('/api/tasks')).find(t=>t.id===a.id).status,'doing')});
    await check('weekly time and full-archive task counts are distinguished',async()=>{const s=await api('/api/summary?date=2026-10-21');assert.equal(s.date,'2026-10-21');assert.equal(s.weekStart,'2026-10-19');assert.equal(s.weekEnd,'2026-10-25');assert.deepEqual(s.totals,{todo:3,doing:1,done:1,overdue:2,minutesThisWeek:60});assert.equal(s.byProject.find(v=>v.projectId===p.id).minutesThisWeek,25);assert.equal(s.byProject.find(v=>v.projectId===q.id).minutesThisWeek,35)});
    await check('invalid time entries do not write',async()=>{for(const extra of [{minutes:0},{minutes:-1},{minutes:1.5},{minutes:1441},{date:'2026-02-29'},{taskId:'missing'},{note:'x'.repeat(2001)}])await invalid('/api/time-entries',{taskId:a.id,date:'2026-10-21',minutes:1,...extra});assert.equal((await api('/api/time-entries')).length,3)});
    await check('deleting one session updates totals without deleting others',async()=>{await api('/api/time-entries/'+first.id,'DELETE',undefined,204);assert.equal((await api('/api/summary?date=2026-10-21')).totals.minutesThisWeek,35);assert.equal((await api('/api/time-entries')).length,2);await api('/api/time-entries/'+first.id,'DELETE',undefined,404)});
    await check('archiving a task preserves history and restart',async()=>{const old=(await api('/api/tasks')).find(t=>t.id===a.id);await api('/api/tasks/'+a.id,'PATCH',{revision:old.revision,archived:true});const history=await api('/api/time-entries');await x.restart();assert.deepEqual(await api('/api/time-entries'),history);assert(!(await api('/api/tasks')).some(t=>t.id===a.id));assert(history.some(t=>t.taskId===a.id))});
  },
  async 'backup-api'(x){
    const{api,project,task,invalid}=x;const p=await project('Backup di Èva');const t=await task(p.id,'Taccuino',{notes:'Riga uno\nRiga due',dueDate:'2028-02-29'});await api('/api/time-entries','POST',{taskId:t.id,date:'2026-10-21',minutes:18,note:'Una nota'},201);await api('/api/tasks/'+t.id,'PATCH',{revision:1,archived:true});
    const original=await api('/api/backup');
    await check('portable export includes archived links and versions',async()=>{assert.equal(original.format,'svolta');assert.equal(original.version,1);assert.equal(original.projects[0].id,p.id);assert.equal(original.tasks[0].archived,true);assert.equal(original.timeEntries[0].taskId,t.id)});
    await project('Da sostituire');
    await check('own backup restores exact IDs, revisions and archive',async()=>{assert.deepEqual(await api('/api/restore','POST',original),{restored:true});assert.deepEqual(await api('/api/backup'),original);await x.restart();assert.deepEqual(await api('/api/backup'),original)});
    await check('invalid graphs and record types leave all data unchanged',async()=>{const variants=[v=>{v.format='wrong'},v=>{v.version=999},v=>{v.projects.push({...v.projects[0]})},v=>{v.tasks[0].projectId='missing'},v=>{v.timeEntries[0].taskId='missing'},v=>{v.tasks[0].dueDate='2026-02-29'},v=>{v.tasks[0].status='unknown'},v=>{v.projects[0].revision=0},v=>{v.timeEntries[0].minutes=-4},v=>{v.projects[0].name=3},v=>{delete v.tasks[0].title}];for(const mutate of variants){const bad=structuredClone(original);mutate(bad);await invalid('/api/restore',bad);assert.deepEqual(await api('/api/backup'),original)}});
    await check('malformed and oversized restore leave archive and server intact',async()=>{for(const body of ['{malformed',JSON.stringify({...original,padding:'x'.repeat(2*1024*1024)})]){const r=await fetch(x.origin+'/api/restore',{method:'POST',headers:{'content-type':'application/json'},body,signal:AbortSignal.timeout(4000)});if(body.length>2*1024*1024)assert.equal(r.status,413);else assert(r.status>=400&&r.status<500);assert.deepEqual(await api('/api/backup'),original)}});
  },
};
if(!apiChecks[criterion]&&!['board-ui','planning-ui','backup-ui'].includes(criterion))throw Error('Unknown approved criterion: '+criterion);
await appTest(async x=>{if(apiChecks[criterion])await apiChecks[criterion](x);else{await x.api('/api/projects');groups=await browserCheck(criterion,x)}});
console.log(JSON.stringify({criterion,result:'PASS',groups}));
