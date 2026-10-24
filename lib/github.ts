export function normalizeRepository(value:string):string|null {
 const input=value.trim();
 const candidate=input.replace(/^https:\/\/github\.com\//i,'').replace(/\/$/,'').replace(/\.git$/i,'');
 return /^[a-z\d](?:[a-z\d-]*[a-z\d])?\/[\w.-]+$/i.test(candidate)&&!candidate.split('/').some(part=>part==='.'||part==='..')?candidate:null;
}
export function githubIssueUrl(repository:string,title:string,body:string):string|null {
 const repo=normalizeRepository(repository);
 if(!repo)return null;
 return `https://github.com/${repo}/issues/new?${new URLSearchParams({title,body,labels:'bug'})}`;
}
