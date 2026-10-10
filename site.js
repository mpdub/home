(function(){
  const footer=document.querySelector(".site-footer");
  const pig=document.querySelector(".pig-button");
  if(footer){
    const footerObserver=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        footer.classList.add("is-visible");
        footerObserver.disconnect();
      }
    },{threshold:.25});
    footerObserver.observe(footer);
  }
  if(pig){
    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const note=document.querySelector(".pig-note");
    let busy=false;
    let resetTimer;
    const settle=()=>{pig.classList.remove("is-hopping");busy=false};
    const showNote=()=>{footer.classList.add("is-visible");note.textContent="oink."};
    const hideNote=()=>{if(!pig.matches(":hover")&&document.activeElement!==pig)note.textContent=""};
    pig.addEventListener("pointerenter",showNote);
    pig.addEventListener("pointerleave",hideNote);
    pig.addEventListener("focus",showNote);
    pig.addEventListener("blur",hideNote);
    pig.addEventListener("click",()=>{
      if(busy)return;
      clearTimeout(resetTimer);
      note.textContent="oink.";
      if(!reducedMotion.matches){busy=true;pig.classList.add("is-hopping")}
      resetTimer=setTimeout(()=>{settle();hideNote()},1200);
    });
    pig.addEventListener("animationend",event=>{if(event.animationName==="pig-hop")settle()});
    reducedMotion.addEventListener("change",()=>{if(reducedMotion.matches)settle()});
  }
})();
