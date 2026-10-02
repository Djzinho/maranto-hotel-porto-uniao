document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');nav.classList.toggle('is-open',!open);document.body.classList.toggle('menu-open',!open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuButton?.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.classList.remove('menu-open')}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4%'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
let last=0;const header=document.querySelector('.header');window.addEventListener('scroll',()=>{const y=scrollY;if(y>100&&y>last)header.style.transform='translateY(-100%)';else header.style.transform='translateY(0)';header.style.transition='transform .35s cubic-bezier(.22,1,.36,1)';last=y},{passive:true});
