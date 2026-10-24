import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeRepository,githubIssueUrl} from '../lib/github.ts';
const sampleRepository='sample-owner/sample-project';
test('An unset repository cannot produce an issue link',()=>assert.equal(githubIssueUrl('','title','body'),null));
test('Issue destinations follow the selected repository',()=>{for(const repo of ['first-owner/first-project','second-owner/second-project'])assert.equal(new URL(githubIssueUrl(repo,'title','body')).pathname,'/'+repo+'/issues/new')});
test('Repository settings accept names and GitHub URLs',()=>{assert.equal(normalizeRepository(' https://github.com/sample-owner/sample-project/ '),sampleRepository);assert.equal(normalizeRepository('sample-owner/sample-project'),sampleRepository);assert.equal(normalizeRepository('https://github.com/sample-owner/sample-project.git'),sampleRepository)});
test('Issue URL preserves special characters and full Markdown',()=>{const title='[BUG] $NaN & broken #checkout';const body='## Steps\n1. Apply WISPR50\n\nExpected: 50% off\n```diff\n+ fix()\n```';const url=new URL(githubIssueUrl(sampleRepository,title,body));assert.equal(url.origin,'https://github.com');assert.equal(url.pathname,'/sample-owner/sample-project/issues/new');assert.equal(url.searchParams.get('title'),title);assert.equal(url.searchParams.get('body'),body);assert.equal(url.searchParams.get('labels'),'bug');assert.ok(!url.href.includes('token'))});
test('Reject unsafe URLs and malformed repository names',()=>{for(const value of ['javascript:alert(1)','https://example.com/o/r','owner/repo/issues','../repo','owner/repo?token=secret','']){assert.equal(normalizeRepository(value),null);assert.equal(githubIssueUrl(value,'title','body'),null)}});
