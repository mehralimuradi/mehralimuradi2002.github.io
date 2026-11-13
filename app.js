(() => {
  'use strict';

  /* ---------- Data (from CV) ---------- */
  const PERSON = {
    name: 'Mehr Ali Muradi',
    initials: 'MA',
    role: 'Computer Science student',
    photo: null, // e.g. 'assets/photo.jpg'
    email: 'mehralimuradi79@gmail.com',
    phones: ['+93 770 299 400', '+93 797 873 586'],
    address: 'First Street of Taimani, Kabul, Afghanistan',
    summary: 'I want to join a well-respected organization where I can take on challenging work, gain new experience, and help the team reach its goals.'
  };

  const T0 = 2019, T1 = 2027;

  const TRACKS = [
    { id: 'V3', name: 'COURSE', color: 'var(--c-course)', kind: 'Course' },
    { id: 'V2', name: 'EDU', color: 'var(--c-edu)', kind: 'Education' },
    { id: 'V1', name: 'WORK', color: 'var(--c-work)', kind: 'Experience' },
    { id: 'A1', name: 'TRAIN', color: 'var(--c-train)', kind: 'Training', audio: true },
    { id: 'A2', name: 'TRAIN', color: 'var(--c-train)', kind: 'Training', audio: true },
    { id: 'A3', name: 'LANG', color: 'var(--c-skill)', kind: 'Languages', audio: true }
  ];

  const CLIPS = [
    { id: 'e_school', track: 'V2', s: 2019.05, e: 2019.95, title: 'High School Diploma', org: 'Hakim Nasir Khosraw Balkhi High School', date: '2019', place: 'Kabul', note: 'Graduated from 12th grade.', status: 'Completed' },
    { id: 'c_eng', track: 'V3', s: 2020.0, e: 2020.45, title: 'Interchange 3 — English (B2)', org: 'Aga Khan Education Service (AKES), Taimani', date: '2020', place: 'Kabul', note: 'Completed upper-intermediate English, level B2.', status: 'Completed' },
    { id: 'c_comp', track: 'V3', s: 2020.5, e: 2020.95, title: 'Computer Programs', org: 'AKES, Chaharqala Wazir Abad', date: '2020', place: 'Kabul', note: 'Windows, typing and the Microsoft Office package.', status: 'Completed' },
    { id: 't_lead', track: 'A2', s: 2020.88, e: 2020.98, title: 'Management & Leadership', org: 'Peshgam Institute of Higher Education', date: '18 – 25 Nov 2020', place: 'Kabul', note: 'Took part in a management and leadership training.', status: 'Completed' },
    { id: 't_net', track: 'A1', s: 2020.93, e: 2021.43, title: 'Networking+', org: 'Mawj-e-Kawsar Teacher Training Center', date: '7 Dec 2020 – 7 Jun 2021', place: 'Kabul', note: 'Completed a six-month Networking+ program.', status: 'Completed' },
    { id: 'w_anwari', track: 'V1', s: 2022.0, e: 2024.98, title: 'Document & Form-Filling Specialist · Technical Staff', org: 'Anwari Printing Press', date: '2022 – 2024', place: 'Kabul', note: 'Prepared and filled documents and forms, and worked as part of the technical staff.', status: '2 years' },
    { id: 'c_dbms', track: 'V3', s: 2025.0, e: 2025.8, title: 'MDS Course — Databases (DBMS)', org: 'AKES, Taimani Center', date: '2025', place: 'Kabul', note: 'Completed a database management systems course.', status: 'Completed' },
    { id: 'e_uni', track: 'V2', s: 2025.4, e: 2027.0, title: 'Computer Science — 4th Semester', org: 'Rana University', date: '2026 · in progress', place: 'Kabul', note: 'Currently in the fourth semester of a Computer Science degree.', status: 'In progress' },
    { id: 'c_cyber', track: 'V3', s: 2026.0, e: 2026.7, title: 'Cyberspace Course', org: 'AKES, Taimani Center', date: '2026', place: 'Kabul', note: 'Completed a course on cyberspace and online safety.', status: 'Completed' },
    { id: 'lang', track: 'A3', s: T0, e: T1, title: 'Dari · Pashto · English', org: 'Languages', date: 'Always on', place: '', note: 'Dari (native), Pashto (good), English (good).', status: 'Native + 2' }
  ];

  const SKILLS = {
    'Office': ['Excel', 'PowerPoint', 'Word', 'Typing'],
    'Creative': ['Photoshop'],
    'Technical': ['Databases (DBMS)', 'Networking+', 'Cyberspace basics', 'Windows'],
    'People': ['Problem-solving', 'Team leadership']
  };
  const LANGS = [['Dari', 'Native', 100], ['Pashto', 'Good', 70], ['English', 'Good · B2', 72]];

  const BINS = [
    { id: 'profile', label: 'Profile', glyph: 'MA', dur: '00:12', g: 'linear-gradient(135deg,hsl(var(--hue) 85% 45%),#0d2a1a)' },
    { id: 'experience', label: 'Experience', glyph: '01', dur: '02:00', g: 'linear-gradient(135deg,#f2a33a,#3a1d05)' },
    { id: 'education', label: 'Education', glyph: '02', dur: '01:30', g: 'linear-gradient(135deg,#5b8cff,#0b1636)' },
    { id: 'courses', label: 'Courses', glyph: '04', dur: '00:48', g: 'linear-gradient(135deg,#b37bff,#21103f)' },
    { id: 'trainings', label: 'Trainings', glyph: '02', dur: '00:30', g: 'linear-gradient(135deg,#2fd1a6,#04271f)' },
    { id: 'skills', label: 'Skills', glyph: '11', dur: '00:24', g: 'linear-gradient(135deg,#ff5d7a,#3a0a14)' },
    { id: 'languages', label: 'Languages', glyph: '03', dur: '00:18', g: 'linear-gradient(135deg,#ffd166,#3b2a00)' },
    { id: 'contact', label: 'Contact', glyph: '@', dur: '00:06', g: 'linear-gradient(135deg,#e8ecef,#2a313b)' }
  ];

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const trackOf = (id) => TRACKS.find(t => t.id === id);
  const pct = (t) => ((t - T0) / (T1 - T0)) * 100;
  const tc = (frac) => {
    const total = Math.max(0, frac) * 64; // 64 s edit
    const h = 0, m = Math.floor(total / 60), s = Math.floor(total % 60), f = Math.floor((total % 1) * 30);
    return [h, m, s, f].map(n => String(n).padStart(2, '0')).join(':');
  };

  const monitor = $('#monitor'), monContent = $('#monContent'), props = $('#props');
  let current = { type: 'section', id: 'profile' };
  let playT = T0;

  /* ---------- Media pool ---------- */
  const pool = $('#poolGrid');
  pool.innerHTML = BINS.map(b => `
    <button class="clip-thumb" data-bin="${b.id}" aria-label="Open ${b.label}">
      <span class="art" style="background:${b.g}"></span>
      <span class="glyph">${b.glyph}</span>
      <span class="lbl"><span>${b.label}</span><span>${b.dur}</span></span>
    </button>`).join('');
  pool.addEventListener('click', e => {
    const b = e.target.closest('[data-bin]');
    if (b) showSection(b.dataset.bin);
  });
  document.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => showSection(b.dataset.jump)));

  /* ---------- Timeline ---------- */
  const ruler = $('#ruler'), tracksEl = $('#tracks'), playhead = $('#playhead'), tlInner = $('#tlInner');
  let rh = '';
  for (let y = T0; y <= T1; y++) {
    rh += `<div class="tick" style="left:${pct(y)}%">${y < T1 ? y : ''}</div>`;
    if (y < T1) rh += `<div class="tick minor" style="left:${pct(y + .5)}%"></div>`;
  }
  ruler.innerHTML = rh;

  const waveSvg = (seed) => {
    let d = '', x = 0, r = seed * 9301 + 49297;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (; x <= 200; x += 2) { const a = 2 + rnd() * 13; d += `M${x} ${16 - a}V${16 + a}`; }
    return `<svg class="wave" viewBox="0 0 200 32" preserveAspectRatio="none"><path d="${d}" stroke="#000" stroke-width="1.1"/></svg>`;
  };

  tracksEl.innerHTML = TRACKS.map((t, i) => `
    <div class="track" data-track="${t.id}">
      <div class="track-label"><i style="background:${t.color}"></i>${t.id} ${t.name}</div>
      ${CLIPS.filter(c => c.track === t.id).map((c, j) => {
        const w = Math.max(pct(c.e) - pct(c.s), 1.4);
        return `<button class="tclip pending ${t.audio ? 'audio' : ''}" data-clip="${c.id}" title="${esc(c.title)} — ${esc(c.date)}"
          style="left:${pct(c.s)}%;width:${w}%;background-color:${t.color}">${t.audio ? waveSvg(i * 7 + j + 3) : ''}<span style="position:relative">${esc(c.title)}</span></button>`;
      }).join('')}
    </div>`).join('');

  tracksEl.addEventListener('click', e => {
    const c = e.target.closest('[data-clip]');
    if (c) { stop(); showClip(c.dataset.clip); seekTo(CLIPS.find(x => x.id === c.dataset.clip).s, false); }
    else seekFromEvent(e);
  });
  ruler.addEventListener('click', seekFromEvent);

  function seekFromEvent(e) {
    const rect = ruler.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    stop();
    seekTo(T0 + f * (T1 - T0), true);
  }

  function placePlayhead() {
    const left = ruler.offsetLeft + (pct(playT) / 100) * ruler.offsetWidth;
    playhead.style.left = left + 'px';
    const t = tc((playT - T0) / (T1 - T0));
    $('#tlTc').textContent = t; $('#monTc').textContent = t; $('#monTc2').textContent = t;
  }

  function clipAt(t) {
    const order = ['V1', 'V2', 'V3', 'A1', 'A2'];
    for (const tr of order) {
      const c = CLIPS.find(c => c.track === tr && t >= c.s && t < c.e);
      if (c) return c;
    }
    return null;
  }

  function seekTo(t, pick) {
    playT = Math.min(T1, Math.max(T0, t));
    placePlayhead();
    if (pick) { const c = clipAt(playT); if (c && !(current.type === 'clip' && current.id === c.id)) showClip(c.id); }
  }

  /* ---------- Monitor renderers ---------- */
  const listItems = (ids) => `<ul class="mon-list">${ids.map(id => {
    const c = CLIPS.find(x => x.id === id);
    return `<li data-open="${c.id}"><span class="y">${esc(c.date.split('·')[0].trim())}</span><span>${esc(c.title)}<small>${esc(c.org)}</small></span></li>`;
  }).join('')}</ul>`;

  const SECTIONS = {
    profile: () => `
      ${PERSON.photo ? `<div class="photo" style="z-index:-1"><img src="${PERSON.photo}" alt="Portrait of ${PERSON.name}"></div>` : ''}
      <div class="monogram">${PERSON.initials}</div>
      <div class="kicker">Portfolio · 2026</div>
      <h1 class="big">${PERSON.name}</h1>
      <span class="caption hl">${PERSON.role}</span>
      <p class="mon-p">${PERSON.summary}</p>
      <div class="chips"><span class="chip">Kabul, AF</span><span class="chip">Office &amp; Photoshop</span></div>`,
    experience: () => `<div class="kicker">Track V1 · Work</div><h2 class="big">Experience</h2><span class="caption">2 years on the job</span>${listItems(['w_anwari'])}
      <p class="mon-p">Prepared and filled documents and forms, and supported the press as technical staff.</p>`,
    education: () => `<div class="kicker">Track V2 · Education</div><h2 class="big">Education</h2><span class="caption">Studying computer science</span>${listItems(['e_uni', 'e_school'])}`,
    courses: () => `<div class="kicker">Track V3 · Courses</div><h2 class="big">Courses</h2><span class="caption">4 certificates</span>${listItems(['c_cyber', 'c_dbms', 'c_comp', 'c_eng'])}`,
    trainings: () => `<div class="kicker">Tracks A1–A2 · Training</div><h2 class="big">Trainings</h2><span class="caption">Networking + leadership</span>${listItems(['t_net', 't_lead'])}`,
    skills: () => `<div class="kicker">Effects rack</div><h2 class="big">Skills</h2><span class="caption hl">What I bring</span>
      ${Object.entries(SKILLS).map(([k, v]) => `<div><div class="kicker" style="color:var(--dim);margin-bottom:6px">${k}</div><div class="chips">${v.map(s => `<span class="chip">${s}</span>`).join('')}</div></div>`).join('')}`,
    languages: () => `<div class="kicker">Track A3 · Audio</div><h2 class="big">Languages</h2><span class="caption">3 languages</span>
      ${LANGS.map(([l, lv, w]) => `<div class="meter"><span>${l}</span><span class="bar"><i style="width:${w}%"></i></span><span class="mono dim" style="font-size:10.5px">${lv}</span></div>`).join('')}`,
    contact: () => `<div class="kicker">Export · Deliver</div><h2 class="big">Let's work together</h2><span class="caption hl">Open to opportunities</span>
      <div class="cta-row">
        <a class="cta primary" href="mailto:${PERSON.email}"><span>Email me</span><span>${PERSON.email}</span></a>
        ${PERSON.phones.map(p => `<a class="cta" href="tel:${p.replace(/\s/g, '')}"><span>Call</span><span>${p}</span></a>`).join('')}
        <div class="cta"><span>Address</span><span>Taimani, Kabul</span></div>
      </div>`
  };

  const SECTION_PROPS = {
    profile: [['Name', PERSON.name], ['Role', PERSON.role], ['Based in', 'Kabul, Afghanistan'], ['Studying', 'Computer Science, Rana University'], ['Email', `<a href="mailto:${PERSON.email}">${PERSON.email}</a>`]],
    experience: [['Clips', '1'], ['Employer', 'Anwari Printing Press'], ['Years', '2022 – 2024']],
    education: [['Clips', '2'], ['Current', 'Computer Science, 4rd semester'], ['School', 'Hakim Nasir Khosraw Balkhi HS']],
    courses: [['Clips', '4'], ['Provider', 'Aga Khan Education Service'], ['Topics', 'English B2, Office, DBMS, Cyberspace']],
    trainings: [['Clips', '2'], ['Topics', 'Networking+, Management & Leadership']],
    skills: [['Office', 'Excel, PowerPoint, Word, Typing'], ['Creative', 'Photoshop'], ['People', 'Problem-solving, Team leadership']],
    languages: LANGS.map(([l, lv]) => [l, lv]),
    contact: [['Email', `<a href="mailto:${PERSON.email}">${PERSON.email}</a>`], ['Phone', PERSON.phones.map(p => `<a href="tel:${p.replace(/\s/g, '')}">${p}</a>`).join('<br>')], ['Address', PERSON.address]]
  };

  function paint(html) {
    monContent.classList.remove('anim');
    monContent.innerHTML = html;
    monContent.classList.toggle('has-photo', !!monContent.querySelector('.photo'));
    monContent.querySelectorAll('.big, .caption').forEach(el => {
      if (el.children.length) return;
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ');
    });
    void monContent.offsetWidth;
    monContent.classList.add('anim');
    monContent.scrollTop = 0;
  }
  function setProps(rows, type) {
    $('#insType').textContent = type;
    props.innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  }
  function mark() {
    document.querySelectorAll('.clip-thumb').forEach(b => b.classList.toggle('on', current.type === 'section' && b.dataset.bin === current.id));
    document.querySelectorAll('.menu button').forEach(b => b.classList.toggle('on', current.type === 'section' && b.dataset.jump === current.id));
    document.querySelectorAll('.tclip').forEach(b => b.classList.toggle('on', current.type === 'clip' && b.dataset.clip === current.id));
  }

  function showSection(id) {
    current = { type: 'section', id };
    const i = BINS.findIndex(b => b.id === id);
    $('#monTitle').textContent = BINS[i].label.toUpperCase();
    $('#monTag').textContent = 'BIN ' + String(i + 1).padStart(2, '0');
    $('#monMeta').textContent = 'Kabul, AF';
    paint(SECTIONS[id]());
    setProps(SECTION_PROPS[id], 'BIN');
    mark();
    if (window.matchMedia('(max-width:720px)').matches && document.activeElement && document.activeElement.closest('.pool,.menu')) {
      $('.monitor-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function showClip(id) {
    const c = CLIPS.find(x => x.id === id), t = trackOf(c.track);
    if (c.id === 'lang') return showSection('languages');
    current = { type: 'clip', id };
    $('#monTitle').textContent = t.kind.toUpperCase();
    $('#monTag').textContent = `${c.track} · ${t.name}`;
    $('#monMeta').textContent = c.place ? `${c.place}, AF` : '';
    paint(`
      <div class="kicker" style="color:${t.color}">${t.kind} · ${esc(c.date)}</div>
      <h2 class="big" style="${c.title.length>34?'font-size:clamp(22px,2.2vw,30px)':''}">${esc(c.title)}</h2>
      <span class="caption">${esc(c.org)}</span>
      <p class="mon-p">${esc(c.note)}</p>
      <div class="chips"><span class="chip">${esc(c.status)}</span>${c.place ? `<span class="chip">${esc(c.place)}</span>` : ''}</div>`);
    setProps([
      ['Clip', esc(c.title)], ['Org', esc(c.org)], ['Date', esc(c.date)],
      ['Track', `<span class="sw" style="background:${t.color}"></span>${c.track} ${t.kind}`],
      ['Status', esc(c.status)], ['Notes', esc(c.note)]
    ], 'CLIP');
    mark();
  }

  monContent.addEventListener('click', e => {
    const li = e.target.closest('[data-open]');
    if (li) { stop(); showClip(li.dataset.open); seekTo(CLIPS.find(x => x.id === li.dataset.open).s, false); }
  });

  /* ---------- Transport ---------- */
  const playBtn = $('#playBtn');
  let playing = false, last = 0, raf = 0;
  const DURATION = 16000;
  function tick(now) {
    if (!playing) return;
    const dt = now - last; last = now;
    playT += (dt / DURATION) * (T1 - T0);
    if (playT >= T1) { playT = T1; seekTo(T1, false); stop(); return; }
    seekTo(playT, true);
    raf = requestAnimationFrame(tick);
  }
  function play() {
    if (playT >= T1 - 0.01) playT = T0;
    playing = true; playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', 'Pause');
    last = performance.now(); raf = requestAnimationFrame(tick);
  }
  function stop() {
    playing = false; cancelAnimationFrame(raf); playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'Play timeline');
  }
  playBtn.addEventListener('click', () => (playing ? stop() : play()));

  const ORDER = CLIPS.filter(c => c.id !== 'lang').sort((a, b) => a.s - b.s).map(c => c.id);
  function step(dir) {
    stop();
    if (current.type === 'clip') {
      const i = (ORDER.indexOf(current.id) + dir + ORDER.length) % ORDER.length;
      showClip(ORDER[i]); seekTo(CLIPS.find(c => c.id === ORDER[i]).s, false);
    } else {
      const i = (BINS.findIndex(b => b.id === current.id) + dir + BINS.length) % BINS.length;
      showSection(BINS[i].id);
    }
  }
  $('#prevBtn').addEventListener('click', () => step(-1));
  $('#nextBtn').addEventListener('click', () => step(1));
  document.addEventListener('keydown', e => {
    if (e.target.closest('input,textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); playing ? stop() : play(); }
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  /* ---------- FX ---------- */
  document.querySelectorAll('.fx').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.fx').forEach(x => x.classList.toggle('on', x === b));
    monitor.classList.remove('fx-glow', 'fx-vhs', 'fx-mono');
    if (b.dataset.fx !== 'none') monitor.classList.add('fx-' + b.dataset.fx);
  }));
  $('.fx[data-fx="none"]').classList.add('on');

  /* ---------- Color wheels ---------- */
  const root = document.documentElement;
  const wheelState = [{ h: 222, d: .55 }, { h: 78, d: .7 }, { h: 40, d: .35 }];
  function applyWheel(i) {
    const w = document.querySelectorAll('.wheel')[i], st = wheelState[i];
    const a = st.h * Math.PI / 180, r = st.d * 42;
    w.querySelector('.wheel-dot').style.left = (50 + Math.sin(a) * r) + '%';
    w.querySelector('.wheel-dot').style.top = (50 - Math.cos(a) * r) + '%';
    if (i === 0) root.style.setProperty('--hue2', st.h);
    if (i === 1) root.style.setProperty('--hue', st.h);
    if (i === 2) root.style.setProperty('--gain', (0.8 + st.d * 0.5).toFixed(2));
  }
  document.querySelectorAll('.wheel').forEach((w, i) => {
    applyWheel(i);
    const move = (e) => {
      const r = w.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      let h = Math.atan2(x, -y) * 180 / Math.PI; if (h < 0) h += 360;
      wheelState[i] = { h: Math.round(h), d: Math.min(1, Math.hypot(x, y) / (r.width / 2)) };
      applyWheel(i);
    };
    w.addEventListener('pointerdown', e => { w.setPointerCapture(e.pointerId); move(e); w.onpointermove = move; });
    w.addEventListener('pointerup', () => { w.onpointermove = null; });
  });

  /* ---------- Scope ---------- */
  const cv = $('#scope'), ctx = cv.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function sizeScope() { cv.width = cv.clientWidth * devicePixelRatio; cv.height = 90 * devicePixelRatio; }
  sizeScope();
  let ph = 0;
  function drawScope() {
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = 1;
    for (let y = 1; y < 4; y++) { ctx.beginPath(); ctx.moveTo(0, H * y / 4); ctx.lineTo(W, H * y / 4); ctx.stroke(); }
    const hue = getComputedStyle(root).getPropertyValue('--hue').trim() || 78;
    const amp = playing ? 1 : .55;
    for (let k = 0; k < 220; k++) {
      const x = (k / 220) * W;
      const base = Math.sin(k * .07 + ph) * .5 + Math.sin(k * .023 - ph * .6) * .5;
      const n = Math.abs(Math.sin(k * 12.9898 + Math.floor(ph * 8)) * 43758.5453 % 1);
      const y = H / 2 + base * H * .22 * amp + (n - .5) * H * .35 * amp;
      ctx.fillStyle = `hsla(${hue},90%,60%,${.25 + n * .5})`;
      ctx.fillRect(x, y, 1.6 * devicePixelRatio, 1.6 * devicePixelRatio);
    }
    ph += playing ? .08 : .02;
    if (!reduce) requestAnimationFrame(drawScope);
  }
  drawScope();

  window.addEventListener('resize', () => { sizeScope(); placePlayhead(); });

  window.APP = { showSection, showClip, play, stop, isPlaying: () => playing, CLIPS, TRACKS, BINS, current: () => current };

  /* ---------- Init ---------- */
  showSection('profile');
  placePlayhead();
})();
