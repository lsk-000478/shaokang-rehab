'use strict';
const knowledge = window.rehabKnowledge || {};
const regions = {
  neck: {name:'颈肩',description:'看屏幕、用手机、抬手拿东西，颈肩参与着许多日常活动。先理解它，再聊活动与训练。',topics:['长时间低头，身体经历了什么？','康复关注哪些活动困难？','如何把运动习惯带进工作日？']},
  back: {name:'腰背',description:'坐着工作、弯腰拿东西、起身行走，腰背与日常活动紧密相连。认识康复，也从这些熟悉的场景开始。',topics:['久坐之后的不适，该怎样理解？','康复评估会关注哪些生活场景？','从日常活动到力量训练，有什么联系？']},
  hand: {name:'手腕',description:'用鼠标、打字、拿手机，或在运动时支撑身体，手腕在许多细小动作中参与其中。',topics:['工作中，手腕参与了哪些活动？','不适已经影响做事，应该关注什么？','健身中的支撑动作与日常功能']},
  hip: {name:'髋部',description:'从椅子上站起、上下楼梯、走路和运动，髋部参与着身体的移动。一起从生活中的动作认识它。',topics:['从坐到站，身体如何配合？','活动度、力量与功能是什么关系？','康复与健身如何围绕个人目标衔接？']},
  knee: {name:'膝部',description:'散步、上下楼、蹲下和起身，都离不开膝部的参与。讨论训练之前，先了解自己的活动需求。',topics:['膝部不适，为什么要了解具体情况？','康复为什么关注走路和上下楼？','恢复运动时，需要考虑哪些个人因素？']},
  ankle: {name:'足踝',description:'足踝连接着站立、行走和运动。它与日常生活的关系，远不止跑得快不快。',topics:['足踝在站立与行走中扮演什么角色？','受伤后的活动困难，可以怎样描述？','回到散步与运动，需要怎样的衔接？']}
};
for (const [key,region] of Object.entries(regions)) {
  knowledge['region-'+key] = {title:region.name+'：从日常功能认识康复',body:`<p>${region.description}</p><p>康复会关注身体问题对日常活动和参与生活的影响。就诊时，可以向专业人员具体描述：什么动作遇到了困难、从什么时候开始、是否影响工作或休闲活动，以及自己希望恢复哪些事情。</p><p>运动训练与康复可以围绕个人目标相互衔接。具体采用什么方法、如何调整强度，需要结合个人情况；身体不适持续、加重或影响生活时，请咨询医生或康复专业人员。</p><a href="https://www.who.int/news-room/fact-sheets/detail/rehabilitation" target="_blank" rel="noopener noreferrer">阅读世界卫生组织关于康复的介绍 ↗</a>`};
}
const dialog = document.getElementById('knowledge-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogBody = document.getElementById('dialog-body');
let lastTrigger = null;
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-open]');
  if(!trigger)return;
  const item=knowledge[trigger.dataset.open];
  if(!item)return;
  if(!dialog.open)lastTrigger=trigger;
  dialogTitle.textContent=item.title;
  dialogBody.innerHTML=item.body;
  if(!dialog.open)dialog.showModal();
  document.documentElement.style.overflow='hidden';
  dialog.scrollTop=0;
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
dialog.addEventListener('close',()=>{document.documentElement.style.overflow='';lastTrigger?.focus({preventScroll:true});});
document.querySelectorAll('[data-region]').forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.region, region=regions[key];
  document.querySelectorAll('[data-region]').forEach(el=>{const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('[data-spot]').forEach(el=>el.classList.toggle('selected',el.dataset.spot===key));
  document.getElementById('region-title').textContent=region.name+'，与每一天。';
  document.getElementById('region-description').textContent=region.description;
  const list=document.getElementById('region-topics');list.replaceChildren(...region.topics.map(topic=>{const li=document.createElement('li');li.textContent=topic;return li;}));
  document.getElementById('region-read').dataset.open='region-'+key;
}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(el=>{const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('[data-category]').forEach(el=>{el.hidden=filter!=='all'&&el.dataset.category!==filter;});
}));
const menu=document.querySelector('.menu-button'), links=document.getElementById('nav-links');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'收起 −':'菜单 ＋';links.classList.toggle('open',open);});
links.addEventListener('click',event=>{if(!event.target.closest('a'))return;links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='菜单 ＋';});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.section-heading,.start-card,.body-layout,.movement-path article,.article-card,.about-copy').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%4)*55+'ms';observer.observe(el);});
}
const visual=document.getElementById('hero-visual');
if(!reduced&&matchMedia('(hover: hover)').matches){
  let frame;
  visual.addEventListener('pointermove',event=>{
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{const rect=visual.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;visual.style.setProperty('--mx',x*100+'%');visual.style.setProperty('--my',y*100+'%');});
  });
  visual.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);visual.style.removeProperty('--mx');visual.style.removeProperty('--my');});
}
