/* Reel-style "multiplayer editing" animation layer:
   several named cursors move around the editor, drag clips from the
   media pool onto the timeline, grade color, sync captions, and log
   what they do. Purely decorative — pointer-events are disabled. */
(() => {
  'use strict';
  const APP = window.APP;
  if (!APP) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = () => matchMedia('(max-width: 720px)').matches;

  const layer = $('#cursors');
  const logEl = $('#log');

  /* ---------- Activity log ---------- */
  const clock = () => {
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, '0')).join(':');
  };
  function log(agent, msg) {
    const li = document.createElement('li');
    li.innerHTML = `<time>${clock()}</time><span><b style="color:${agent.color}">${agent.name}</b> ${msg}</span>`;
    logEl.prepend(li);
    while (logEl.children.length > 14) logEl.lastChild.remove();
  }

  /* ---------- Cursors ---------- */
  const AGENTS = [
    { name: 'editor', color: 'hsl(78 92% 58%)' },
    { name: 'colorist', color: '#ff5d7a' },
    { name: 'captions', color: '#5b8cff' }
  ];
  AGENTS.forEach((a, i) => {
    const el = document.createElement('div');
    el.className = 'agent';
    el.innerHTML = `<svg width="16" height="20" viewBox="0 0 16 20"><path d="M1 1l13 10.5-6 .6 3.4 6.4-2.6 1.3L5.5 13.4 1 17.5z" fill="${a.color}" stroke="#05070a" stroke-width="1.2" stroke-linejoin="round"/></svg>
      <span class="tag" style="background:${a.color}">${a.name}</span>`;
    layer.appendChild(el);
    a.el = el;
    a.x = innerWidth * (0.3 + i * 0.2); a.y = innerHeight * 0.4;
    el.style.transform = `translate(${a.x}px, ${a.y}px)`;
  });

  const centerOf = (el, jitter = 0.25) => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + scrollX + r.width * (0.5 + rand(-jitter, jitter)),
      y: r.top + scrollY + r.height * (0.5 + rand(-jitter, jitter)),
      visible: r.bottom > 0 && r.top < innerHeight && r.width > 0
    };
  };

  function move(a, x, y, d) {
    d = d ?? Math.min(1200, 350 + Math.hypot(x - a.x, y - a.y) * 0.9);
    a.el.style.setProperty('--d', d + 'ms');
    a.el.style.transform = `translate(${x}px, ${y}px)`;
    a.x = x; a.y = y;
    return sleep(d);
  }
  function click(a) {
    a.el.classList.remove('click'); void a.el.offsetWidth; a.el.classList.add('click');
    const r = document.createElement('div');
    r.className = 'ripple'; r.style.setProperty('--c', a.color);
    r.style.left = a.x + 'px'; r.style.top = a.y + 'px';
    layer.appendChild(r); setTimeout(() => r.remove(), 600);
    return sleep(220);
  }
  function flash(el) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }

  const binFor = { V3: 'courses', V2: 'education', V1: 'experience', A1: 'trainings', A2: 'trainings', A3: 'languages' };

  /* Drag a ghost thumbnail from the pool onto a timeline clip */
  async function dragToClip(a, clipEl, fast) {
    const clip = APP.CLIPS.find(c => c.id === clipEl.dataset.clip);
    const tile = $(`[data-bin="${binFor[clip.track]}"]`);
    const from = centerOf(tile, 0.1), to = centerOf(clipEl, 0.05);
    if (!from.visible && !to.visible) { clipEl.classList.remove('pending'); return; }
    await move(a, from.x, from.y, fast ? 380 : undefined);
    await click(a);
    const tr = tile.getBoundingClientRect();
    const g = document.createElement('div');
    g.className = 'ghost';
    g.style.width = tr.width * 0.6 + 'px'; g.style.height = tr.height * 0.4 + 'px';
    g.style.background = getComputedStyle(clipEl).backgroundColor;
    const gx = (x, y) => `translate(${x + 10}px, ${y + 8}px)`;
    g.style.setProperty('--d', '0ms'); g.style.transform = gx(a.x, a.y);
    layer.appendChild(g); void g.offsetWidth;
    const d = fast ? 520 : Math.min(1200, 350 + Math.hypot(to.x - a.x, to.y - a.y) * 0.9);
    g.style.setProperty('--d', d + 'ms'); g.style.transform = gx(to.x, to.y);
    await move(a, to.x, to.y, d);
    g.style.opacity = '0'; setTimeout(() => g.remove(), 300);
    clipEl.classList.remove('pending');
    clipEl.classList.add('dropin'); setTimeout(() => clipEl.classList.remove('dropin'), 500);
    flash(clipEl);
    log(a, `placed “${clip.title.split('—')[0].trim()}” on ${clip.track}`);
  }

  /* ---------- Intro: build the timeline ---------- */
  async function intro() {
    const clips = $$('.tclip');
    if (reduce || small()) {
      clips.forEach((c, i) => setTimeout(() => { c.classList.remove('pending'); c.classList.add('dropin'); }, i * 90));
      log(AGENTS[0], 'imported 10 clips from CV');
      return;
    }
    log(AGENTS[0], 'opened career_edit');
    log(AGENTS[2], 'loaded profile title card');
    const order = [...clips].sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left));
    // two agents build in parallel
    const lanes = [[], []];
    order.forEach((c, i) => lanes[i % 2].push(c));
    await Promise.all(lanes.map(async (lane, li) => {
      const a = AGENTS[li === 0 ? 0 : 2];
      await sleep(li * 250);
      for (const c of lane) await dragToClip(a, c, true);
    }));
    log(AGENTS[1], 'applied grade · teal/amber');
    await sleep(400);
    if (!APP.isPlaying()) APP.play();
  }

  /* ---------- Idle behaviours ---------- */
  const behaviours = {
    async editor(a) {
      const clips = $$('.tclip');
      await dragToClip(a, pick(clips), false);
    },
    async colorist(a) {
      const w = pick($$('.wheel'));
      const c = centerOf(w, 0);
      if (!c.visible) return;
      const r = w.getBoundingClientRect().width * 0.28;
      await move(a, c.x + r, c.y);
      await click(a);
      for (let k = 1; k <= 8; k++) await move(a, c.x + Math.cos(k * 0.8) * r, c.y + Math.sin(k * 0.8) * r, 120);
      flash(w);
      const name = w.querySelector('span').textContent;
      log(a, `nudged ${name} ${Math.random() > .5 ? '+' : '−'}${Math.ceil(rand(1, 6))}`);
    },
    async captions(a) {
      const target = pick([$('.caption'), $('.big'), $('#scope'), pick($$('.clip-thumb'))].filter(Boolean));
      const c = centerOf(target);
      if (!c.visible) return;
      await move(a, c.x, c.y);
      await click(a);
      flash(target);
      if (target.classList.contains('clip-thumb')) {
        log(a, `previewed bin “${target.querySelector('.lbl span').textContent}”`);
      } else if (target.id === 'scope') {
        log(a, 'checked levels · −14 LUFS');
      } else {
        log(a, `synced caption “${target.textContent.trim().slice(0, 22)}”`);
      }
    }
  };

  async function loop(a) {
    await sleep(rand(600, 2000));
    while (true) {
      if (document.hidden || small() || reduce) { a.el.style.opacity = small() ? '0' : '1'; await sleep(1500); continue; }
      a.el.style.opacity = '1';
      try { await behaviours[a.name](a); } catch (e) { /* element changed mid-move */ }
      // wander a little
      await move(a, a.x + rand(-60, 60), a.y + rand(-40, 40), 700);
      await sleep(rand(800, 2200));
    }
  }

  // Keep the log meaningful when the user drives the editor
  const origSection = APP.showSection, origClip = APP.showClip;
  document.addEventListener('click', e => {
    const bin = e.target.closest('[data-bin],[data-jump]');
    const clip = e.target.closest('[data-clip],[data-open]');
    const you = { name: 'you', color: '#e8ecef' };
    if (bin) log(you, `opened ${(bin.dataset.bin || bin.dataset.jump)}`);
    else if (clip) {
      const c = APP.CLIPS.find(x => x.id === (clip.dataset.clip || clip.dataset.open));
      if (c) log(you, `selected “${c.title.split('—')[0].trim()}”`);
    }
  });

  window.addEventListener('load', async () => {
    await intro();
    AGENTS.forEach(loop);
  });
  if (document.readyState === 'complete') { /* load already fired */ intro().then(() => AGENTS.forEach(loop)); }
})();
