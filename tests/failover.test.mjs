import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const encode=source=>'data:text/javascript;base64,'+Buffer.from(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64');
const engine=encode(await readFile(new URL('../lib/engine.ts',import.meta.url),'utf8'));
const route=await readFile(new URL('../app/api/analyze-bug/route.ts',import.meta.url),'utf8');
const {POST}=await import(encode(route.replace("@/lib/engine",engine)));
test('Gemini retries the backup key and falls back locally if both fail',async()=>{
 const oldFetch=globalThis.fetch,oldMain=process.env.GEMINI_API_KEY,oldBackup=process.env.GEMINI_FALLBACK_API_KEY;
 process.env.GEMINI_API_KEY='test-primary';process.env.GEMINI_FALLBACK_API_KEY='test-backup';
 const request=()=>new Request('https://example.com/api/analyze-bug',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({voiceRant:'The promo code fails with a timeout.'})});
 const called=[];
 try{
 globalThis.fetch=async(_url,options)=>{called.push(options.headers['x-goog-api-key']);if(called.length===1)return new Response('{}',{status:429});return Response.json({candidates:[{content:{parts:[{text:JSON.stringify({title:'Promo timeout',severity:'HIGH / P1',component:'Checkout',observation:'Promo fails',steps:['Apply promo'],expected:'Discount applied',actual:'Timeout',diagnosis:'Inspect pool',patch:'+ retry()'})}]}}]})};
 const response=await POST(request());const data=await response.json();assert.deepEqual(called,['test-primary','test-backup']);assert.equal(data.source,'Gemini · backup key');
 globalThis.fetch=async()=>new Response('{}',{status:503});const local=await(await POST(request())).json();assert.equal(local.source,'Deterministic fallback · AI unavailable');
 }finally{globalThis.fetch=oldFetch;if(oldMain===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=oldMain;if(oldBackup===undefined)delete process.env.GEMINI_FALLBACK_API_KEY;else process.env.GEMINI_FALLBACK_API_KEY=oldBackup;}
});
