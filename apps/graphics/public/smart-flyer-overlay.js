let signature="";
const scene=document.getElementById("scene");
function render(payload){const s=payload?.scene;if(!s){scene.hidden=true;window.BmmsSmartFlyerRenderer.clear(scene);return;}const next=JSON.stringify(s);if(next===signature)return;signature=next;scene.hidden=false;window.BmmsSmartFlyerRenderer.render(scene,s);}
async function update(){try{const r=await fetch("/api/smart-flyer/program",{cache:"no-store"});render(await r.json());}catch{}}
update();setInterval(update,500);
