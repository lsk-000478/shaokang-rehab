(() => {
  'use strict';
  const section = document.getElementById('body-guide');
  const videos = [...section.querySelectorAll('.body-background-video')];
  const control = section.querySelector('.body-video-toggle');
  const label = control.querySelector('span');
  const credit = section.querySelector('.body-video-credit');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reducedMotion.matches;
  let visible = false;
  let active = videos[0];
  const sourceCredits = {
    upper: {url:'https://www.pexels.com/video/a-woman-guiding-a-man-in-stretching-his-arms-6111066/',text:'真人运动场景 · Kampus Production / Pexels ↗'},
    lower: {url:'https://www.pexels.com/video/man-exercising-using-resistance-band-8836962/',text:'真人运动场景 · MART PRODUCTION / Pexels ↗'}
  };
  const displayControl = paused => {
    control.setAttribute('aria-pressed',String(paused));
    label.textContent = paused ? '播放背景视频' : '暂停背景视频';
    section.dataset.videoState = paused ? 'paused' : 'playing';
  };
  const syncPlayback = () => {
    for (const video of videos) {
      video.muted = true;
      if (video !== active || !visible || userPaused || document.hidden) video.pause();
    }
    const shouldPlay = visible && !userPaused && !document.hidden;
    displayControl(!shouldPlay);
    const requested = active;
    if (shouldPlay) requested.play().catch(error => {
      if (requested !== active || userPaused || !visible || document.hidden || error.name === 'AbortError' || !requested.paused) return;
      userPaused = true;
      displayControl(true);
    });
  };
  section.querySelector('.body-menu').addEventListener('click',event => {
    const button = event.target.closest('[data-region]');
    if (!button) return;
    const key = ['hip','knee','ankle'].includes(button.dataset.region) ? 'lower' : 'upper';
    const next = videos.find(video => video.dataset.video === key);
    if (next !== active) {
      active = next;
      videos.forEach(video => video.classList.toggle('is-active',video === active));
      credit.href = sourceCredits[key].url;
      credit.textContent = sourceCredits[key].text;
      section.dataset.videoScene = key;
      syncPlayback();
    }
    const panel = section.querySelector('.region-panel');
    if (!reducedMotion.matches) {
      panel.getAnimations().forEach(animation => animation.cancel());
      panel.animate([{opacity:.5,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
    }
  });
  control.addEventListener('click',() => { userPaused = !userPaused; syncPlayback(); });
  document.addEventListener('visibilitychange',syncPlayback);
  reducedMotion.addEventListener('change',event => { userPaused = event.matches; syncPlayback(); });
  videos.forEach(video => {
    video.addEventListener('error',() => {
      if (video === active) { userPaused = true; displayControl(true); }
    });
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncPlayback();
    },{threshold:.05}).observe(section);
  } else { visible = true; syncPlayback(); }
  section.dataset.videoScene = 'upper';
  displayControl(true);
})();
