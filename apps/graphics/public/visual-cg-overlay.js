const host=document.getElementById("visualScene");let signature="";
async function update(){try{const response=await fetch("/api/visual-cg/program",{cache:"no-store"}),payload=await response.json(),next=JSON.stringify(payload.scene||null);if(next===signature)return;signature=next;if(payload.scene)window.BmmsVisualCgRenderer.render(host,payload.scene);else window.BmmsVisualCgRenderer.clear(host)}catch{}}
update();setInterval(update,500);
