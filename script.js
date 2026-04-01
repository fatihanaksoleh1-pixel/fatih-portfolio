/* ===========================
   BOOT SEQUENCE
   =========================== */
const bootScreen   = document.getElementById('boot-screen');
const bootTerminal = document.getElementById('boot-terminal');
const bootProgress = document.getElementById('boot-progress');
const bootLabel    = document.getElementById('boot-bar-label');

const bootSequence = [
  { type: 'cmd',  text: '> BIOS v2.0.24 ... OK',                          delay: 0    },
  { type: 'info', text: 'Checking hardware integrity...',                  delay: 700  },
  { type: 'ok',   text: '[OK] CPU: FatihCore i9 @ 4.20GHz',               delay: 1300 },
  { type: 'ok',   text: '[OK] RAM: 32GB DDR5 — Neon Edition',             delay: 1800 },
  { type: 'ok',   text: '[OK] GPU: CyberForce RTX 9090',                  delay: 2200 },
  { type: 'info', text: 'Initializing network stack...',                   delay: 2700 },
  { type: 'ok',   text: '[OK] Network: Connected — 1Gbps',                delay: 3200 },
  { type: 'cmd',  text: '> whoami',                                        delay: 3800 },
  { type: 'ok',   text: 'Fatih Shauky — Web Developer & Creative Coder',  delay: 4300 },
  { type: 'info', text: 'Role: Frontend Engineer | Level: Junior Dev',     delay: 4700 },
  { type: 'cmd',  text: '> load_projects --all',                           delay: 5300 },
  { type: 'info', text: 'Scanning /projects directory...',                 delay: 5800 },
  { type: 'ok',   text: '[LOADED] portfolio-website.exe',                  delay: 6300 },
  { type: 'ok',   text: '[LOADED] mini-arcade.exe',                        delay: 6700 },
  { type: 'warn', text: '[PENDING] next-project.exe — coming soon',        delay: 7100 },
  { type: 'cmd',  text: '> start_game --module=snake,target',              delay: 7700 },
  { type: 'info', text: 'Loading game engine...',                          delay: 8200 },
  { type: 'ok',   text: '[OK] Snake v1.0 — Ready',                        delay: 8700 },
  { type: 'ok',   text: '[OK] Bug Crusher v1.0 — Ready',                  delay: 9100 },
  { type: 'cmd',  text: '> mount /skills',                                 delay: 9700 },
  { type: 'ok',   text: '[MOUNTED] HTML, CSS, JS, React, Git, Figma',     delay: 10200},
  { type: 'info', text: 'Applying visual theme: CYBERPUNK_DARK...',        delay: 10800},
  { type: 'ok',   text: '[OK] Theme loaded — neon green active',           delay: 11400},
  { type: 'cmd',  text: '> boot --launch portfolio.exe',                   delay: 12000},
  { type: 'done', text: '[ SYSTEM READY ] Welcome to FatihOS.',           delay: 12700},
];

const progressSteps = [3,7,13,19,24,30,36,41,47,52,57,61,65,69,72,76,80,83,86,89,92,95,98,100];

function addBootLine(type, text) {
  const line = document.createElement('span');
  line.className = `boot-line ${type}`;
  line.textContent = text;
  bootTerminal.appendChild(line);
  bootTerminal.scrollTop = bootTerminal.scrollHeight;
}

function runBoot() {
  bootSequence.forEach((step, i) => {
    setTimeout(() => {
      addBootLine(step.type, step.text);
      bootProgress.style.width = progressSteps[i] + '%';
      bootLabel.textContent = step.text.replace(/^[>\[\]]/g, '').trim();

      if (i === bootSequence.length - 1) {
        // Tunggu sampai progress bar benar-benar kelihatan 100%, baru hilang
        setTimeout(() => {
          bootProgress.style.width = '100%';
          bootLabel.textContent = 'Complete — 100%';
        }, 200);
        setTimeout(() => {
          bootScreen.classList.add('hide');
        }, 1500);
      }
    }, step.delay);
  });
}

// Block page scroll during boot
document.body.style.overflow = 'hidden';
bootScreen.addEventListener('transitionend', () => {
  bootScreen.style.display = 'none';
  document.body.style.overflow = '';
});

runBoot();

// Skip boot hanya aktif setelah 3 detik (biar gak ke-skip waktu buka halaman)
let skipEnabled = false;
setTimeout(() => {
  skipEnabled = true;
  bootScreen.addEventListener('click', skipBoot);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') skipBoot();
  }, { once: true });
}, 3000);

function skipBoot() {
  if (!skipEnabled) return;
  bootScreen.classList.add('hide');
  document.body.style.overflow = '';
}

/* ===========================
   EASTER EGG — type "admin"
   =========================== */
let eggBuffer = '';
const eggTrigger = 'admin';

const eggMessages = [
  {
    lines: [
      { cls: 'cmd',        text: '> sudo su -'                              },
      { cls: 'warn',       text: '[WARNING] Unauthorized access attempt!'   },
      { cls: 'egg-typed',  text: 'Password: ••••••••'                       },
      { cls: 'egg-secret', text: '[ ACCESS GRANTED ] Welcome, root.'        },
      { cls: 'ok',         text: 'Loading secret files...'                  },
      { cls: 'egg-secret', text: '> SECRET: Fatih\'s fav song = Lo-Fi Beats while coding 🎧' },
      { cls: 'egg-secret', text: '> SECRET: Debugs best at 2AM ☕'          },
      { cls: 'egg-secret', text: '> SECRET: Once fixed a bug by restarting the PC 🖥️' },
      { cls: 'warn',       text: '[ This message will self-destruct in 10s ]'},
    ],
    autoClose: 10000,
  },
];

let currentEgg = 0;

document.addEventListener('keydown', (e) => {
  if (document.getElementById('easter-egg').classList.contains('hidden')) {
    eggBuffer += e.key.toLowerCase();
    eggBuffer = eggBuffer.slice(-eggTrigger.length);
    if (eggBuffer === eggTrigger) {
      eggBuffer = '';
      showEgg();
    }
  }
});

function showEgg() {
  const egg = eggMessages[currentEgg % eggMessages.length];
  currentEgg++;
  const eggEl = document.getElementById('easter-egg');
  const contentEl = document.getElementById('egg-content');
  contentEl.innerHTML = '';

  eggEl.classList.remove('hidden');

  egg.lines.forEach((line, i) => {
    setTimeout(() => {
      const span = document.createElement('div');
      span.className = line.cls;
      span.textContent = line.text;
      contentEl.appendChild(span);
    }, i * 220);
  });

  if (egg.autoClose) {
    setTimeout(closeEgg, egg.autoClose);
  }
}

function closeEgg() {
  document.getElementById('easter-egg').classList.add('hidden');
}

/* ===========================
   MATRIX RAIN
   =========================== */
const matrixCanvas = document.getElementById('matrix-canvas');
const mCtx = matrixCanvas.getContext('2d');

function resizeMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|;:あアいイうウえエおオ';
const fontSize = 14;
let columns = Math.floor(matrixCanvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  mCtx.fillStyle = 'rgba(5,5,5,0.05)';
  mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  mCtx.fillStyle = '#00ff41';
  mCtx.font = fontSize + 'px Share Tech Mono, monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    mCtx.fillStyle = Math.random() > 0.95 ? '#ffffff' : '#00ff41';
    mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

/* ===========================
   TYPING ANIMATION
   =========================== */
const roles = [
  'Web Developer',
  'Creative Coder',
  'Frontend Engineer',
  'UI/UX Enthusiast',
  'Game Developer',
  'Cyberpunk Builder',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeWriter() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 100);
}
typeWriter();

/* ===========================
   HAMBURGER MENU
   =========================== */
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

/* ===========================
   SCROLL ANIMATIONS
   =========================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .terminal-window').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ===========================
   PROJECTS
   =========================== */
function openProject(url) {
  if (url && url !== '#') {
    window.open(url, '_blank');
  }
}

/* ===========================
   CONTACT FORM
   =========================== */
async function sendMessage(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const name = document.getElementById('name').value;
  const responseEl = document.getElementById('form-response');

  responseEl.textContent = '> Sending message...';
  responseEl.style.color = '#00e5ff';

  try {
    const res = await fetch('https://formspree.io/f/xzdkvdpg', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      responseEl.textContent = `> Message sent! Thanks ${name}, I'll get back to you soon. ✓`;
      responseEl.style.color = '#00ff41';
      form.reset();
    } else {
      responseEl.textContent = '> Failed to send. Please try again.';
      responseEl.style.color = '#ff003c';
    }
  } catch {
    responseEl.textContent = '> Network error. Check your connection.';
    responseEl.style.color = '#ff003c';
  }
}

/* ===========================
   SNAKE GAME
   =========================== */
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

const CELL = 20;
const COLS = canvas.width / CELL;
const ROWS = canvas.height / CELL;

let snake, dir, nextDir, food, score, highScore, level, gameLoop, running;

highScore = parseInt(localStorage.getItem('snakeHS') || '0');
document.getElementById('highscore').textContent = highScore;

function initGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  level = 1;
  document.getElementById('score').textContent = 0;
  document.getElementById('level').textContent = 1;
  document.getElementById('game-status').textContent = '> Game running... Good luck!';
  placeFood();
}

function placeFood() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  food = pos;
}

function startGame() {
  if (gameLoop) clearInterval(gameLoop);
  running = true;
  initGame();
  document.getElementById('start-btn').textContent = '[ RESTART ]';
  gameLoop = setInterval(update, getSpeed());
}

function getSpeed() {
  return Math.max(80, 200 - (level - 1) * 20);
}

function update() {
  dir = { ...nextDir };
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Wall collision
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    return gameOver();
  }
  // Self collision
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    return gameOver();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('score').textContent = score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('snakeHS', highScore);
      document.getElementById('highscore').textContent = highScore;
    }
    // Level up every 50 points
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel > level) {
      level = newLevel;
      document.getElementById('level').textContent = level;
      clearInterval(gameLoop);
      gameLoop = setInterval(update, getSpeed());
    }
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function gameOver() {
  clearInterval(gameLoop);
  running = false;
  draw();
  document.getElementById('game-status').textContent =
    `> GAME OVER — Score: ${score} | High: ${highScore} | Press START`;
  document.getElementById('start-btn').textContent = '[ PLAY AGAIN ]';
}

function draw() {
  // Background
  ctx.fillStyle = '#020c02';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid
  ctx.strokeStyle = '#0a1a0a';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= canvas.width; x += CELL) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += CELL) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // Food — glowing red pixel
  ctx.shadowColor = '#ff003c';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ff003c';
  ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);
  ctx.shadowBlur = 0;

  // Snake
  snake.forEach((seg, i) => {
    const isHead = i === 0;
    ctx.shadowColor = isHead ? '#00ff41' : '#00cc33';
    ctx.shadowBlur = isHead ? 14 : 4;
    ctx.fillStyle = isHead ? '#00ff41' : `hsl(${130 - i * 2}, 100%, ${40 - i * 0.5}%)`;
    ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);

    // Head eyes
    if (isHead) {
      ctx.fillStyle = '#000';
      ctx.shadowBlur = 0;
      const ex = dir.x === 1 ? 12 : dir.x === -1 ? 3 : 5;
      const ey = dir.y === 1 ? 12 : dir.y === -1 ? 3 : 5;
      ctx.fillRect(seg.x * CELL + ex, seg.y * CELL + ey, 3, 3);
      ctx.fillRect(seg.x * CELL + ex, seg.y * CELL + ey + 6, 3, 3);
    }
  });
  ctx.shadowBlur = 0;
}

function changeDir(dx, dy) {
  // Prevent reversing
  if (dx === -dir.x && dy === -dir.y) return;
  nextDir = { x: dx, y: dy };
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  switch (e.key) {
    case 'ArrowUp': case 'w': case 'W':
      e.preventDefault(); changeDir(0, -1); break;
    case 'ArrowDown': case 's': case 'S':
      e.preventDefault(); changeDir(0, 1); break;
    case 'ArrowLeft': case 'a': case 'A':
      e.preventDefault(); changeDir(-1, 0); break;
    case 'ArrowRight': case 'd': case 'D':
      e.preventDefault(); changeDir(1, 0); break;
    case ' ':
      e.preventDefault();
      startGame(); break;
  }
});

// Draw initial idle screen
(function drawIdle() {
  ctx.fillStyle = '#020c02';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff41';
  ctx.shadowColor = '#00ff41';
  ctx.shadowBlur = 10;
  ctx.font = '16px Share Tech Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('> SNAKE.EXE', canvas.width / 2, canvas.height / 2 - 30);
  ctx.font = '13px Share Tech Mono, monospace';
  ctx.fillStyle = '#00cc33';
  ctx.shadowBlur = 0;
  ctx.fillText('Press [ START ] or SPACE', canvas.width / 2, canvas.height / 2 + 10);
  ctx.fillText('to begin...', canvas.width / 2, canvas.height / 2 + 35);
  ctx.textAlign = 'left';
})();

/* ===========================
   ACTIVE NAV LINK + PARALLAX
   =========================== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Active nav highlight
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    a.style.textShadow = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#00ff41';
      a.style.textShadow = '0 0 8px #00ff41';
    }
  });

  // Parallax on matrix canvas
  matrixCanvas.style.transform = `translateY(${scrollY * 0.25}px)`;
});

/* ===========================
   PARTICLE SYSTEM
   =========================== */
const pCanvas = document.getElementById('particle-canvas');
const pCtx = pCanvas.getContext('2d');
let particles = [];

function resizePCanvas() {
  pCanvas.width  = window.innerWidth;
  pCanvas.height = window.innerHeight;
}
resizePCanvas();
window.addEventListener('resize', resizePCanvas);

class Particle {
  constructor(x, y, color, vxMul = 1) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 10 * vxMul;
    this.vy = (Math.random() - 0.8) * 10 * vxMul;
    this.life  = 1;
    this.decay = Math.random() * 0.025 + 0.018;
    this.size  = Math.random() * 5 + 1.5;
    this.color = color;
    this.square = Math.random() > 0.5;
  }
  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.vy += 0.18;          // gravity
    this.vx *= 0.98;          // drag
    this.life -= this.decay;
    this.size  *= 0.97;
  }
  draw() {
    pCtx.save();
    pCtx.globalAlpha = Math.max(0, this.life);
    pCtx.shadowColor = this.color;
    pCtx.shadowBlur  = 8;
    pCtx.fillStyle   = this.color;
    if (this.square) {
      pCtx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      pCtx.fill();
    }
    pCtx.restore();
  }
}

const NEON_COLORS = ['#00ff41', '#00e5ff', '#bf00ff', '#ffe600'];

function spawnParticles(x, y, count = 18, colors = NEON_COLORS, vxMul = 1) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], vxMul));
  }
}

(function animateParticles() {
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
})();

/* ===========================
   CLICK: RIPPLE + PARTICLES
   =========================== */
document.addEventListener('click', (e) => {
  // Skip if clicking inside game canvases (handled separately)
  if (e.target.id === 'target-canvas') return;

  // Ripple DOM element
  const size = 140;
  const ripple = document.createElement('div');
  ripple.className = 'ripple-fx';
  Object.assign(ripple.style, {
    left:   `${e.clientX - size / 2}px`,
    top:    `${e.clientY - size / 2}px`,
    width:  `${size}px`,
    height: `${size}px`,
  });
  document.body.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });

  // Particle burst
  spawnParticles(e.clientX, e.clientY, 16);
});

/* ===========================
   BUTTON / NAV GLITCH ON CLICK
   =========================== */
document.addEventListener('click', (e) => {
  const el = e.target.closest('.btn, .nav-links a, .ctrl-btn, .game-tab, .skill-tag');
  if (!el) return;
  el.classList.remove('glitch-active');
  void el.offsetWidth; // force reflow
  el.classList.add('glitch-active');
  el.addEventListener('animationend', () => el.classList.remove('glitch-active'), { once: true });
});

/* ===========================
   GAME TAB SWITCHER
   =========================== */
function switchGame(mode, btn) {
  document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.game-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + mode).classList.add('active');
}

/* ===========================
   TARGET CLICKER GAME
   =========================== */
const tCanvas = document.getElementById('target-canvas');
const tCtx = tCanvas.getContext('2d');

const T_W = tCanvas.width;
const T_H = tCanvas.height;

let tScore, tLives, tTime, tTargets, tRunning, tTimerInterval, tSpawnInterval, tAnimFrame;
const T_HS_KEY = 'targetHS';

function startTargetGame() {
  // Reset
  if (tTimerInterval)  clearInterval(tTimerInterval);
  if (tSpawnInterval)  clearInterval(tSpawnInterval);
  if (tAnimFrame)      cancelAnimationFrame(tAnimFrame);
  tTargets = [];
  tScore   = 0;
  tLives   = 3;
  tTime    = 30;
  tRunning = true;

  document.getElementById('t-score').textContent = 0;
  document.getElementById('t-lives').textContent = '❤❤❤';
  document.getElementById('t-time').textContent  = 30;
  document.getElementById('t-status').textContent = '> Click the bugs! GO!';
  document.getElementById('t-start-btn').textContent = '[ RESTART ]';

  tTimerInterval = setInterval(() => {
    if (!tRunning) return;
    tTime--;
    document.getElementById('t-time').textContent = tTime;
    if (tTime <= 0) endTargetGame(true);
  }, 1000);

  tSpawnInterval = setInterval(() => {
    if (!tRunning) return;
    spawnTarget();
    // Remove expired targets
    tTargets = tTargets.filter(t => {
      if (t.life <= 0) {
        tLives--;
        updateLives();
        if (tLives <= 0) endTargetGame(false);
        return false;
      }
      return true;
    });
  }, 900);

  tLoop();
}

function spawnTarget() {
  const minR = 14, maxR = 34;
  const r = Math.floor(Math.random() * (maxR - minR) + minR);
  tTargets.push({
    x:    r + Math.random() * (T_W - r * 2),
    y:    r + Math.random() * (T_H - r * 2),
    r:    r,
    maxR: r,
    life: 1,          // 0..1 shrinking ring
    decay: 0.008 + Math.random() * 0.006,
    hue:  Math.random() * 40,   // slight color variation on red
    hit:  false,
    explodeParticles: 0,
  });
}

function updateLives() {
  const hearts = ['', '❤', '❤❤', '❤❤❤'];
  document.getElementById('t-lives').textContent = hearts[Math.max(0, tLives)] || '💀';
}

function endTargetGame(timeout) {
  tRunning = false;
  clearInterval(tTimerInterval);
  clearInterval(tSpawnInterval);
  const hs = Math.max(tScore, parseInt(localStorage.getItem(T_HS_KEY) || '0'));
  localStorage.setItem(T_HS_KEY, hs);
  const msg = timeout
    ? `> TIME'S UP! Score: ${tScore} | Best: ${hs}`
    : `> GAME OVER! Score: ${tScore} | Best: ${hs}`;
  document.getElementById('t-status').textContent = msg;
  document.getElementById('t-start-btn').textContent = '[ PLAY AGAIN ]';
}

function tLoop() {
  tCtx.fillStyle = 'rgba(2,0,2,0.92)';
  tCtx.fillRect(0, 0, T_W, T_H);

  // Grid
  tCtx.strokeStyle = '#1a001a';
  tCtx.lineWidth = 0.5;
  for (let x = 0; x <= T_W; x += 20) {
    tCtx.beginPath(); tCtx.moveTo(x, 0); tCtx.lineTo(x, T_H); tCtx.stroke();
  }
  for (let y = 0; y <= T_H; y += 20) {
    tCtx.beginPath(); tCtx.moveTo(0, y); tCtx.lineTo(T_W, y); tCtx.stroke();
  }

  tTargets.forEach(t => {
    if (!t.hit) {
      t.life -= t.decay;

      const alpha  = Math.max(0, t.life);
      const shrunk = t.r * t.life;  // visual radius shrinks as life drops

      // Outer ring (timer indicator)
      tCtx.beginPath();
      tCtx.arc(t.x, t.y, t.r + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * t.life);
      tCtx.strokeStyle = `rgba(255,${Math.floor(t.life * 80)},60,${alpha})`;
      tCtx.lineWidth = 3;
      tCtx.shadowColor = '#ff003c';
      tCtx.shadowBlur  = 6;
      tCtx.stroke();

      // Bug body
      tCtx.beginPath();
      tCtx.arc(t.x, t.y, shrunk, 0, Math.PI * 2);
      tCtx.fillStyle = `rgba(${200 + Math.floor(t.hue)},0,${60 + Math.floor(t.hue * 2)},${alpha})`;
      tCtx.shadowColor = '#ff003c';
      tCtx.shadowBlur  = 12;
      tCtx.fill();

      // X mark inside
      tCtx.strokeStyle = `rgba(255,255,255,${alpha * 0.6})`;
      tCtx.lineWidth   = 2;
      tCtx.shadowBlur  = 0;
      const s = shrunk * 0.45;
      tCtx.beginPath(); tCtx.moveTo(t.x-s,t.y-s); tCtx.lineTo(t.x+s,t.y+s); tCtx.stroke();
      tCtx.beginPath(); tCtx.moveTo(t.x+s,t.y-s); tCtx.lineTo(t.x-s,t.y+s); tCtx.stroke();
    }
  });

  tCtx.shadowBlur = 0;

  // Remove dead targets
  tTargets = tTargets.filter(t => t.life > 0 || t.hit);

  if (!tRunning && tTargets.length === 0) {
    // Draw idle / game over text
    tCtx.fillStyle   = '#ff003c';
    tCtx.shadowColor = '#ff003c';
    tCtx.shadowBlur  = 12;
    tCtx.font = '15px Share Tech Mono, monospace';
    tCtx.textAlign = 'center';
    tCtx.fillText('> BUG CRUSHER.EXE', T_W / 2, T_H / 2 - 20);
    tCtx.fillStyle  = '#cc0030';
    tCtx.shadowBlur = 0;
    tCtx.font = '12px Share Tech Mono, monospace';
    tCtx.fillText('Press [ START ] to play', T_W / 2, T_H / 2 + 15);
    tCtx.textAlign = 'left';
  }

  tAnimFrame = requestAnimationFrame(tLoop);
}

// Click handler for target game
tCanvas.addEventListener('click', (e) => {
  if (!tRunning) return;
  const rect  = tCanvas.getBoundingClientRect();
  const scaleX = T_W / rect.width;
  const scaleY = T_H / rect.height;
  const mx = (e.clientX - rect.left) * scaleX;
  const my = (e.clientY - rect.top)  * scaleY;

  let hit = false;
  for (let i = tTargets.length - 1; i >= 0; i--) {
    const t  = tTargets[i];
    const dx = mx - t.x;
    const dy = my - t.y;
    if (Math.sqrt(dx * dx + dy * dy) <= t.r * t.life + 4) {
      // Points based on size: smaller = more points
      const pts = Math.round(30 - (t.maxR - 14));
      tScore += pts;
      document.getElementById('t-score').textContent = tScore;
      t.hit  = true;
      tTargets.splice(i, 1);

      // Explosion particles at canvas-relative position on screen
      const screenX = rect.left + (t.x / scaleX);
      const screenY = rect.top  + (t.y / scaleY);
      spawnParticles(screenX, screenY, 28, ['#ff003c','#ff6040','#ffe600','#ff00aa'], 1.4);
      hit = true;
      break;
    }
  }

  // Miss flash
  if (!hit) {
    tCtx.fillStyle = 'rgba(255,0,60,0.12)';
    tCtx.fillRect(0, 0, T_W, T_H);
  }
});

// Draw initial target idle screen
tLoop();
