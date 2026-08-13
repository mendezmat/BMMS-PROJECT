const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const hex=rgb=>`#${rgb.map(value=>Math.round(value).toString(16).padStart(2,"0")).join("")}`;
const luminance=rgb=>(rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722)/255;
const saturation=rgb=>{const high=Math.max(...rgb),low=Math.min(...rgb);return high?((high-low)/high):0};
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);

function palette(pixels,count=5){
  const seeds=Array.from({length:count},(_,index)=>pixels[Math.floor((pixels.length-1)*index/Math.max(1,count-1))]||[32,36,42]);
  for(let pass=0;pass<7;pass++){
    const groups=seeds.map(()=>[]);
    pixels.forEach(pixel=>{let winner=0,best=Infinity;seeds.forEach((seed,index)=>{const score=distance(pixel,seed);if(score<best){best=score;winner=index}});groups[winner].push(pixel)});
    groups.forEach((group,index)=>{if(group.length)seeds[index]=[0,1,2].map(channel=>group.reduce((sum,pixel)=>sum+pixel[channel],0)/group.length)});
  }
  return seeds.sort((a,b)=>luminance(a)-luminance(b));
}

export function analyzeVisualIntent(image){
  const canvas=document.createElement("canvas");canvas.width=96;canvas.height=54;
  const context=canvas.getContext("2d",{willReadFrequently:true});context.drawImage(image,0,0,96,54);
  const data=context.getImageData(0,0,96,54).data,pixels=[],lights=[];
  let vivid=0;
  for(let i=0;i<data.length;i+=16){const rgb=[data[i],data[i+1],data[i+2]],sat=saturation(rgb);pixels.push(rgb);lights.push(luminance(rgb));if(sat>.5)vivid++}
  const colors=palette(pixels),average=lights.reduce((a,b)=>a+b,0)/lights.length;
  const contrast=Math.sqrt(lights.reduce((sum,value)=>sum+(value-average)**2,0)/lights.length);
  const sat=pixels.reduce((sum,pixel)=>sum+saturation(pixel),0)/pixels.length;
  const colorSpread=Math.max(...colors.flatMap((color,index)=>colors.slice(index+1).map(other=>distance(color,other))))/441.7;
  let edges=0,comparisons=0;
  for(let y=0;y<53;y++)for(let x=0;x<95;x++){const a=(y*96+x)*4,b=(y*96+x+1)*4,c=((y+1)*96+x)*4;const here=(data[a]+data[a+1]+data[a+2])/3;edges+=(Math.abs(here-(data[b]+data[b+1]+data[b+2])/3)+Math.abs(here-(data[c]+data[c+1]+data[c+2])/3))/510;comparisons++}
  const detail=edges/comparisons,warm=pixels.reduce((sum,pixel)=>sum+(pixel[0]-pixel[2])/255,0)/pixels.length;
  return classifyVisualMetrics({average,contrast,sat,detail,warm,colors,colorSpread,vividShare:vivid/pixels.length});
}

export function classifyVisualMetrics({average=.5,contrast=.2,sat=.2,detail=.04,warm=0,colors=[[20,24,30],[240,240,238]],colorSpread=0,vividShare=0}){
  const energy=clamp(sat*.55+contrast*.85+detail*1.15+colorSpread*.28);
  let family="studio";
  if((vividShare>.1&&colorSpread>.32)||(sat>.36&&detail>.055)||(colorSpread>.48&&detail>.045))family="kinetic";
  else if(sat<.16&&detail<.034)family="minimal";
  else if(warm>.045&&sat<.38&&vividShare<.09)family="editorial";
  else if(average<.3||contrast>.31)family="broadcast";
  const era=family==="editorial"?"vintage":family==="minimal"?"minimal":"contemporary";
  const mood={kinetic:"youth",minimal:"minimal",editorial:detail>.045?"organic":"elegant",broadcast:"night",studio:"balanced"}[family];
  const texture=detail>.085?"grain":detail>.035?"textured":"smooth";
  const material=family==="editorial"?(texture==="smooth"?"parchment":"paper"):family==="kinetic"?"digital":family==="broadcast"?"carbon":"clean";
  const typography=family==="editorial"?"serif":family==="kinetic"||family==="broadcast"?"display":"sans";
  const geometry=family==="kinetic"?"angular":family==="minimal"?"strict":family==="editorial"?"organic":"soft";
  const dominant=colors[Math.min(colors.length-1,Math.floor(colors.length*.55))]||[30,34,40];
  const accent=[...colors].sort((a,b)=>(saturation(b)*.68+luminance(b)*.32)-(saturation(a)*.68+luminance(a)*.32))[0]||dominant;
  return {family,mood,era,material,typography,geometry,texture,energy,brightness:average,contrast,saturation:sat,colorSpread,vividShare,palette:colors.map(hex),surface:family==="editorial"||average>=.42?"light":"dark",accent:hex(accent)};
}

export function profileLabel(profile){return {kinetic:"Kinetic / juvenil",minimal:"Minimal",editorial:"Editorial / orgánico",broadcast:"Broadcast / intenso",studio:"Studio / contemporáneo"}[profile?.family]||"Studio / contemporáneo"}
export function profileSummary(profile){if(!profile)return "";const texture={grain:"grano marcado",textured:"textura visible",smooth:"superficie limpia"}[profile.texture];return `${profile.family} · ${texture} · contraste ${Math.round(profile.contrast*100)}%`}
