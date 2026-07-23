function visualLength(text){
  let n=0;
  for(const ch of text){
    if("MWÁÉÍÓÚÜÑ".includes(ch)) n+=1.28;
    else if("ilI.,:;!'|".includes(ch)) n+=0.48;
    else if(ch===" ") n+=0.55;
    else n+=1;
  }
  return n;
}

function breakPenalty(previousWord){
  if(!previousWord) return 0;
  if(/[.;!?]$/.test(previousWord)) return -16;
  if(/[,;:]$/.test(previousWord)) return -9;
  if(/^(y|e|o|u|ni|que|de|del|la|el|los|las|a|en|con|por)$/i.test(previousWord)) return 24;
  return 0;
}

export function balanceLines(text,maxLines=4){
  const words=String(text||"").trim().split(/\s+/).filter(Boolean);
  if(words.length<5) return words.join(" ");

  const total=visualLength(words.join(" "));
  const estimated=Math.max(2,Math.min(maxLines,Math.ceil(total/61)));
  const candidates=[];
  for(let lineCount=Math.max(2,estimated-1);lineCount<=Math.min(maxLines,estimated+1);lineCount++){
    candidates.push(solve(words,lineCount));
  }
  candidates.sort((a,b)=>a.score-b.score);
  return candidates[0].lines.join("\n");
}

function solve(words,lineCount){
  const n=words.length;
  const prefix=[0];
  for(let i=0;i<n;i++){
    prefix.push(prefix[i]+visualLength(words[i])+(i?0.55:0));
  }
  const total=prefix[n];
  const target=total/lineCount;
  const dp=Array.from({length:lineCount+1},()=>Array(n+1).fill(Infinity));
  const prev=Array.from({length:lineCount+1},()=>Array(n+1).fill(-1));
  dp[0][0]=0;

  const lineLen=(i,j)=>{
    let len=0;
    for(let k=i;k<j;k++) len+=visualLength(words[k])+(k>i?0.55:0);
    return len;
  };

  for(let l=1;l<=lineCount;l++){
    for(let j=l;j<=n;j++){
      for(let i=l-1;i<j;i++){
        const len=lineLen(i,j);
        const diff=len-target;
        let cost=dp[l-1][i]+diff*diff;
        if(len<target*0.62) cost+=Math.pow(target*0.62-len,2)*2.6;
        if(len>target*1.22) cost+=Math.pow(len-target*1.22,2)*4.5;
        if(i>0) cost+=breakPenalty(words[i-1]);
        if(j<n && /^(y|e|o|u|ni|que|de|del|la|el|los|las|a|en|con|por)$/i.test(words[j])) cost+=18;
        if(l===lineCount && j===n) cost+=Math.abs(len-target)*0.25;
        if(cost<dp[l][j]){dp[l][j]=cost;prev[l][j]=i;}
      }
    }
  }

  let lines=[], j=n;
  for(let l=lineCount;l>0;l--){
    const i=prev[l][j];
    if(i<0) return {score:Infinity,lines:[words.join(" ")]};
    lines.unshift(words.slice(i,j).join(" "));
    j=i;
  }
  const lengths=lines.map(visualLength);
  const shortest=Math.min(...lengths), longest=Math.max(...lengths);
  let score=dp[lineCount][n]+Math.pow(longest-shortest,2)*0.45;
  if(shortest<longest*0.58) score+=500;
  return {score,lines};
}
