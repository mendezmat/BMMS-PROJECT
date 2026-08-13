(function(){
  const WIDTH=1920,HEIGHT=1080;
  const families=new Set(["minimal","studio","editorial","kinetic","broadcast","legacy","legacyGlass","legacyBanner"]);
  const positions=new Set(["auto","top-left","top-center","top-right","middle-left","middle-right","bottom-left","bottom-center","bottom-right"]);
  const fonts={inter:'Inter,Arial,sans-serif',manrope:'Manrope,Inter,Arial,sans-serif',montserrat:'Montserrat,Arial,sans-serif',dm:'"DM Sans",Inter,Arial,sans-serif',serif:'Georgia,"Times New Roman",serif'};
  const defaults={minimal:"bottom-left",studio:"bottom-center",editorial:"bottom-left",kinetic:"bottom-right",broadcast:"bottom-left",legacy:"middle-left",legacyGlass:"bottom-left",legacyBanner:"bottom-center"};
  const sizes={minimal:[800,132],studio:[940,176],editorial:[920,190],kinetic:[900,170],broadcast:[860,152],legacy:[1040,228],legacyGlass:[990,204],legacyBanner:[1440,158]};
  const text=v=>String(v??"").trim(),safeImage=v=>/^data:image\/(?:png|jpeg|webp|gif|svg\+xml);/i.test(v||"")?v:"";
  const el=(tag,className,value)=>{const node=document.createElement(tag);if(className)node.className=className;if(value!==undefined&&value!==null)node.textContent=value;return node};
  function normalize(scene={}){
    const d=scene.document||{},p=scene.profile||{},a=scene.appearance||{},l=scene.layout||{},assets=scene.assets||{},animation=scene.animation||{};
    const family=families.has(p.family)?p.family:"studio",position=positions.has(l.position)?l.position:"auto";
    return{document:{title:text(d.title)||"Título del evento",subtitle:text(d.subtitle),date:text(d.date),time:text(d.time),location:text(d.location),additionalInfo:text(d.additionalInfo)},profile:{...p,family,palette:Array.isArray(p.palette)?p.palette:["#111318","#f4f4f2"],accent:p.accent||"#4f8cff"},layout:{position,autoFit:l.autoFit!==false},appearance:{font:fonts[a.font]?a.font:"inter",weight:Math.min(900,Math.max(400,Number(a.weight)||700)),align:["left","center","right"].includes(a.align)?a.align:"left",scale:Math.min(1.25,Math.max(.72,Number(a.scale)||1)),surface:["auto","dark","light","glass"].includes(a.surface)?a.surface:"auto"},assets:{image:safeImage(assets.image),qr:safeImage(assets.qr),qrLabel:text(assets.qrLabel)||"ESCANEA AQUÍ"},animation:{preset:["none","smooth","rise","slide","reveal","scale"].includes(animation.preset)?animation.preset:"smooth",duration:Math.min(1600,Math.max(250,Number(animation.duration)||650))}};
  }
  function build(scene){
    const s=normalize(scene),resolved=s.layout.position==="auto"?defaults[s.profile.family]:s.layout.position;
    const canvas=el("div",`visual-cg design-${s.profile.family} position-${resolved} align-${s.appearance.align} surface-${s.appearance.surface} motion-${s.animation.preset}`);
    canvas.dataset.titleSize=s.document.title.length>58?"long":s.document.title.length>34?"medium":"short";
    canvas.classList.toggle("has-image",Boolean(s.assets.image));canvas.classList.toggle("has-qr",Boolean(s.assets.qr));canvas.classList.toggle("has-subtitle",Boolean(s.document.subtitle));canvas.classList.toggle("auto-fit",s.layout.autoFit);
    canvas.style.setProperty("--tone-1",s.profile.palette[0]||"#111318");canvas.style.setProperty("--tone-2",s.profile.palette[1]||"#30343c");canvas.style.setProperty("--tone-3",s.profile.palette.at(-2)||"#d2c5ad");canvas.style.setProperty("--tone-4",s.profile.palette.at(-1)||"#f4f4f2");canvas.style.setProperty("--accent",s.profile.accent);canvas.style.setProperty("--cg-font",fonts[s.appearance.font]);canvas.style.setProperty("--cg-weight",s.appearance.weight);canvas.style.setProperty("--cg-scale",s.appearance.scale);canvas.style.setProperty("--motion-duration",`${s.animation.duration}ms`);
    const card=el("section","visual-cg-card"),accent=el("div","visual-cg-accent"),meta=el("div","visual-cg-meta"),copy=el("div","visual-cg-copy");
    if(s.assets.image){const media=el("div","visual-cg-media"),img=el("img");img.src=s.assets.image;img.alt="";media.append(img);card.append(media)}
    [s.document.date,s.document.time,s.document.location].filter(Boolean).forEach(value=>meta.append(el("span","",value)));
    copy.append(el("h2","",s.document.title));if(s.document.subtitle)copy.append(el("p","",s.document.subtitle));if(s.document.additionalInfo)copy.append(el("small","",s.document.additionalInfo));
    card.append(accent,meta,copy);
    if(s.assets.qr){const qr=el("div","visual-cg-qr"),img=el("img"),label=el("span","",s.assets.qrLabel);img.src=s.assets.qr;img.alt="Código QR";qr.append(img,label);card.append(qr)}
    canvas.append(card);return canvas;
  }
  function boundsFor(canvas){
    const family=[...canvas.classList].find(n=>n.startsWith("design-"))?.slice(7)||"studio",position=[...canvas.classList].find(n=>n.startsWith("position-"))?.slice(9)||defaults[family];
    const [width,height]=sizes[family]||sizes.studio,marginX=118,marginY=86;
    let x=marginX,y=HEIGHT-height-marginY;
    if(position.endsWith("center"))x=(WIDTH-width)/2;else if(position.endsWith("right"))x=WIDTH-width-marginX;
    if(position.startsWith("top"))y=marginY;else if(position.startsWith("middle"))y=(HEIGHT-height)/2;
    return{x,y,width,height};
  }
  function fit(host){const viewport=host?.querySelector(".visual-cg-viewport"),canvas=viewport?.firstElementChild;if(!canvas)return;const bounds=host.dataset.visualView==="composition"?boundsFor(canvas):{x:0,y:0,width:WIDTH,height:HEIGHT},scale=Math.min(viewport.clientWidth/bounds.width,viewport.clientHeight/bounds.height);canvas.style.transform=`translate(${(viewport.clientWidth-bounds.width*scale)/2-bounds.x*scale}px,${(viewport.clientHeight-bounds.height*scale)/2-bounds.y*scale}px) scale(${scale})`}
  function render(host,scene,options={}){if(!host)return;host.dataset.visualView=options.view==="composition"?"composition":"frame";host.classList.add("visual-cg-host");host.replaceChildren();const viewport=el("div","visual-cg-viewport");viewport.append(build(scene));host.append(viewport);host.hidden=false;if(!host.__visualObserver&&typeof ResizeObserver==="function"){host.__visualObserver=new ResizeObserver(()=>fit(host));host.__visualObserver.observe(host)}requestAnimationFrame(()=>fit(host))}
  function clear(host,message="Sin composición al aire."){if(host)host.replaceChildren(el("span","visual-cg-empty",message))}
  window.BmmsVisualCgRenderer=Object.freeze({WIDTH,HEIGHT,normalize,render,clear,fit});
})();
