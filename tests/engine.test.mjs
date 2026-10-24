import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fallback,scenarios} from '../lib/engine.ts';
import {bookmarklet} from '../lib/bookmarklet.ts';
for(const s of scenarios)test(`Evidence maps to ${s.name}`,()=>{
 const t=fallback({voiceRant:s.rant,consoleErrors:[s.error],networkLogs:[],domSelector:s.selector,viewport:'1440x900',url:'https://example.com',clicks:[s.selector]});
 assert.equal(t.component,s.component);assert.ok(t.patch.includes('+'));assert.ok(t.markdown.includes(s.error));assert.ok(t.steps.some(x=>x.includes(s.selector)));assert.ok(t.handoff.includes(t.severity));
});
test('Unknown evidence does not fabricate a cause or code location',()=>{const t=fallback({voiceRant:'The profile photo is missing',consoleErrors:[],networkLogs:[],domSelector:'img',viewport:'1200x900',url:'https://example.com',clicks:[]});assert.equal(t.component,'External website');assert.match(t.diagnosis,/does not establish/);assert.match(t.patch,/No verified code location/)});
test('Bookmarklet is syntactically valid and encodes its origin safely',()=>{const code=decodeURIComponent(bookmarklet('https://example.com').slice(11));assert.doesNotThrow(()=>new Function(code));assert.ok(code.includes('ext_rant'));assert.ok(code.includes('removeEventListener'))});
