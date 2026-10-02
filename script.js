document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');nav.classList.toggle('is-open',!open);document.body.classList.toggle('menu-open',!open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuButton?.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.classList.remove('menu-open')}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4%'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
let last=0;const header=document.querySelector('.header');window.addEventListener('scroll',()=>{const y=scrollY;if(y>100&&y>last)header.style.transform='translateY(-100%)';else header.style.transform='translateY(0)';header.style.transition='transform .35s cubic-bezier(.22,1,.36,1)';last=y},{passive:true});

const roomTrack=document.querySelector('.room-list');
const roomCards=[...document.querySelectorAll('.room-list .room')];
const roomDots=[...document.querySelectorAll('.rooms-progress i')];
let roomRaf=0;
const syncRoomProgress=()=>{
  if(!roomTrack||innerWidth>780)return;
  cancelAnimationFrame(roomRaf);
  roomRaf=requestAnimationFrame(()=>{
    const center=roomTrack.scrollLeft+roomTrack.clientWidth/2;
    let active=0,min=Infinity;
    roomCards.forEach((card,i)=>{const c=card.offsetLeft+card.offsetWidth/2,d=Math.abs(c-center);if(d<min){min=d;active=i}});
    roomDots.forEach((dot,i)=>dot.classList.toggle('is-active',i===active));
  });
};
roomTrack?.addEventListener('scroll',syncRoomProgress,{passive:true});
window.addEventListener('resize',syncRoomProgress,{passive:true});
syncRoomProgress();