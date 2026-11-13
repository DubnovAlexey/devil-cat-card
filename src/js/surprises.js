// ФАЙЛ: src/js/surprises.js
// НАЗНАЧЕНИЕ: «неожиданности» визитки Devil Cat — изредка поверх страницы появляется что-то из мира Василия.
// Свой состав и свои движения (не как в Props и Game Hub):
//   scratch  — лапа Василия выныривает сбоку, по экрану остаются три огненные царапины и остывают;
//   snatch   — стрекоза влетает и зависает над страницей, лапа выхватывает её сбоку и уносит;
//   wink     — секретарша-суккуб заглядывает сбоку, подмигивает, посылает поцелуй — на «стекле» след помады;
//   pentacle — на экране прожигается пентаграмма и медленно остывает;
//   soul     — по низу катится банка с чьей-то душой, лапа укатывает её обратно;
//   contract — сверху разворачивается договор с отпечатком лапы и сгорает снизу вверх.
// Правила: одна неожиданность за раз; первая — через 12–20 с, дальше — раз в 35–70 с; на скрытой вкладке,
// при «уменьшить движение» и после выключения кнопкой 🐾 их нет. Слой не ловит нажатия.
// Картинки — реалистичные вырезанные фигуры в src/img/surprises/; вид, чья картинка не загрузилась, пропускается.
// Звук — короткие шумы Web Audio, только после первого касания страницы (так требуют браузеры).
(() => {
    'use strict';
    const STORE = 'devil-cat-card:surprises';
    const DIR = 'src/img/surprises/';
    // Виды, чьи картинки уже лежат в src/img/surprises/. snatch (стрекоза), wink (поцелуй) и soul (банка с душой)
    // добавятся, когда будут нарисованы их картинки, — иначе каждая страница просила бы несуществующие файлы.
    const KINDS = ['scratch', 'pentacle', 'contract'];
    const NEEDS = {
        scratch: ['paw.webp', 'scratches.webp'],
        snatch: ['dragonfly.webp', 'paw-catch.webp'],
        wink: ['succubus-wink.webp', 'succubus-kiss.webp', 'kiss.webp'],
        pentacle: ['pentacle.webp'],
        soul: ['soul-jar.webp', 'paw.webp'],
        contract: ['contract.webp'],
    };
    const rand = (min, max) => min + Math.random() * (max - min);
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let enabled = true;
    try { enabled = localStorage.getItem(STORE) !== 'off'; } catch { /* хранилище недоступно — включено */ }

    // НАЧАЛО РАЗДЕЛА «слой и кнопка»
    const layer = document.createElement('div');
    layer.className = 'surprise-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'surprise-toggle';
    toggle.textContent = '🐾';
    const syncToggle = () => {
        toggle.setAttribute('aria-pressed', String(enabled));
        toggle.setAttribute('aria-label', enabled ? 'Surprises are on — press to send Vasily away' : 'Surprises are off — press to call Vasily back');
        toggle.title = toggle.getAttribute('aria-label');
        toggle.classList.toggle('surprise-toggle--off', !enabled);
    };
    toggle.addEventListener('click', () => {
        enabled = !enabled;
        try { localStorage.setItem(STORE, enabled ? 'on' : 'off'); } catch { /* только на эту вкладку */ }
        if (!enabled) layer.replaceChildren();
        syncToggle();
    });
    syncToggle();
    if (!reduce) document.body.appendChild(toggle);
    // КОНЕЦ РАЗДЕЛА «слой и кнопка»

    // НАЧАЛО РАЗДЕЛА «картинки» — проверяем заранее, какие виды можно показывать
    const loaded = new Map();
    // Загрузка картинки с ограничением по времени: на фоновой вкладке браузер может не отвечать вовсе,
    // и тогда вид просто пропускается, а расписание не зависает
    const loadImage = (img, ms) => new Promise((resolve) => {
        if (img.complete && img.naturalWidth) { resolve(true); return; }
        const done = (ok) => { clearTimeout(timer); resolve(ok); };
        const timer = setTimeout(() => done(img.complete && img.naturalWidth > 0), ms);
        img.addEventListener('load', () => done(true), { once: true });
        img.addEventListener('error', () => done(false), { once: true });
    });
    const preload = (file) => {
        if (!loaded.has(file)) {
            const img = new Image();
            img.src = DIR + file;
            loaded.set(file, loadImage(img, 8000));
        }
        return loaded.get(file);
    };
    const ready = async (kind) => (await Promise.all(NEEDS[kind].map(preload))).every(Boolean);
    const sprite = async (file, className) => {
        const img = document.createElement('img');
        img.src = DIR + file;
        img.alt = '';
        img.className = `surprise ${className}`;
        layer.appendChild(img);
        await loadImage(img, 1500);
        return img;
    };
    // КОНЕЦ РАЗДЕЛА «картинки»

    // НАЧАЛО РАЗДЕЛА «звук»
    let audio = null;
    const wake = () => {
        try {
            // старый Safari знает Web Audio только под именем webkitAudioContext
            // noinspection JSUnresolvedReference
            audio = audio || new (window.AudioContext || window.webkitAudioContext)();
            if (audio.state === 'suspended') audio.resume();
        } catch { audio = null; }
    };
    window.addEventListener('pointerdown', wake, { once: true });
    window.addEventListener('keydown', wake, { once: true });
    // Шум с фильтром: царапина, шлепок, треск огня, катящаяся банка — разные частоты и длительность
    const noise = (seconds, from, to, gain = 0.18, type = 'bandpass') => {
        if (!audio || audio.state !== 'running') return;
        const length = Math.floor(audio.sampleRate * seconds);
        const buffer = audio.createBuffer(1, length, audio.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
        const source = audio.createBufferSource();
        source.buffer = buffer;
        const filter = audio.createBiquadFilter();
        filter.type = type;
        filter.frequency.setValueAtTime(from, audio.currentTime);
        filter.frequency.exponentialRampToValueAtTime(to, audio.currentTime + seconds);
        const volume = audio.createGain();
        volume.gain.value = gain;
        source.connect(filter).connect(volume).connect(audio.destination);
        source.start();
    };
    // Шелест крыльев стрекозы: пила с быстрым дрожанием громкости
    const buzz = (seconds) => {
        if (!audio || audio.state !== 'running') return;
        const osc = audio.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 190;
        const tremolo = audio.createOscillator();
        tremolo.frequency.value = 28;
        const depth = audio.createGain();
        depth.gain.value = 0.02;
        const volume = audio.createGain();
        volume.gain.value = 0.025;
        tremolo.connect(depth).connect(volume.gain);
        osc.connect(volume).connect(audio.destination);
        osc.start();
        tremolo.start();
        osc.stop(audio.currentTime + seconds);
        tremolo.stop(audio.currentTime + seconds);
    };
    // КОНЕЦ РАЗДЕЛА «звук»

    // НАЧАЛО РАЗДЕЛА «сценки»
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const place = (node, x, y, extra = '') => { node.style.transform = `translate(${x}px, ${y}px) ${extra}`; };

    const SCENES = {
        // Лапа выныривает слева, царапает — на экране три огненные царапины, они остывают и гаснут
        async scratch() {
            const y = rand(0.15, 0.55) * H();
            const marks = await sprite('scratches.webp', 'surprise--scratches');
            place(marks, rand(0.1, 0.4) * W(), y);
            const paw = await sprite('paw.webp', 'surprise--paw');
            place(paw, -paw.offsetWidth - 40, y);
            await wait(30);
            paw.classList.add('surprise--move-fast');
            place(paw, rand(0.05, 0.25) * W(), y + 40, 'rotate(-14deg)');
            await wait(380);
            place(paw, rand(0.25, 0.4) * W(), y + 160, 'rotate(8deg)');
            marks.classList.add('surprise--scratches-on');
            noise(0.45, 3800, 900, 0.22);
            await wait(420);
            place(paw, -paw.offsetWidth - 60, y + 120, 'rotate(-20deg)');
            await wait(3400);
            marks.classList.add('surprise--fade');
            await wait(1600);
        },
        // Стрекоза влетает справа и зависает над страницей; лапа выхватывает её слева и уносит с собой
        async snatch() {
            const x = rand(0.3, 0.7) * W();
            const y = rand(0.2, 0.55) * H();
            const dragonfly = await sprite('dragonfly.webp', 'surprise--dragonfly surprise--hover');
            place(dragonfly, W() + 80, y - 140, 'rotate(-90deg)');
            buzz(2.6);
            await wait(30);
            dragonfly.classList.add('surprise--move-wobble');
            place(dragonfly, x, y, 'rotate(-95deg)');
            await wait(rand(2600, 3400));
            const paw = await sprite('paw-catch.webp', 'surprise--paw');
            place(paw, -paw.offsetWidth - 40, y - paw.offsetHeight * 0.35);
            await wait(30);
            paw.classList.add('surprise--move-fast');
            place(paw, x - paw.offsetWidth * 0.78, y - paw.offsetHeight * 0.35, 'rotate(-6deg)');
            await wait(330);
            dragonfly.remove();
            noise(0.08, 2600, 900, 0.18);
            await wait(500);
            place(paw, -paw.offsetWidth - 80, y - paw.offsetHeight * 0.3, 'rotate(10deg)');
            await wait(900);
        },
        // Секретарша заглядывает справа, подмигивает, посылает поцелуй — на стекле остаётся след помады
        async wink() {
            const y = rand(0.08, 0.3) * H();
            const lady = await sprite('succubus-wink.webp', 'surprise--lady');
            place(lady, W() + 20, y);
            await wait(30);
            lady.classList.add('surprise--move-soft');
            place(lady, W() - lady.offsetWidth * 0.62, y, 'rotate(-6deg)');
            await wait(2600);
            lady.src = DIR + 'succubus-kiss.webp';
            await wait(700);
            const kiss = await sprite('kiss.webp', 'surprise--kiss');
            place(kiss, rand(0.3, 0.6) * W(), rand(0.3, 0.6) * H(), `rotate(${rand(-20, 20).toFixed(0)}deg)`);
            noise(0.12, 900, 300, 0.25, 'lowpass');
            await wait(900);
            place(lady, W() + 40, y, 'rotate(4deg)');
            await wait(4200);
            kiss.classList.add('surprise--fade');
            await wait(1600);
        },
        // Пентаграмма прожигается: вспыхивает, светится, остывает до тёмно-красного и гаснет
        async pentacle() {
            const mark = await sprite('pentacle.webp', 'surprise--pentacle');
            place(mark, rand(0.15, 0.6) * W(), rand(0.15, 0.5) * H());
            noise(1.6, 1200, 200, 0.12, 'highpass');
            await wait(30);
            mark.classList.add('surprise--burn');
            await wait(5200);
        },
        // Банка с душой катится по низу, останавливается; лапа укатывает её обратно
        async soul() {
            const jar = await sprite('soul-jar.webp', 'surprise--jar');
            const y = H() - jar.offsetHeight * 0.55 - 10;
            place(jar, -jar.offsetWidth, y);
            noise(1.6, 180, 90, 0.15, 'lowpass');
            await wait(30);
            jar.classList.add('surprise--move-roll');
            place(jar, rand(0.3, 0.55) * W(), y, 'rotate(360deg)');
            await wait(2600);
            jar.classList.add('surprise--shiver');
            await wait(1400);
            const paw = await sprite('paw.webp', 'surprise--paw');
            place(paw, -paw.offsetWidth, y - 40);
            await wait(30);
            paw.classList.add('surprise--move-fast');
            place(paw, rand(0.1, 0.3) * W(), y - 30);
            await wait(500);
            jar.classList.remove('surprise--shiver');
            jar.classList.add('surprise--move-roll');
            place(jar, -jar.offsetWidth - 60, y, 'rotate(-360deg)');
            place(paw, -paw.offsetWidth - 80, y - 40);
            noise(1.4, 160, 80, 0.15, 'lowpass');
            await wait(2600);
        },
        // Договор опускается сверху, качается и сгорает снизу вверх
        async contract() {
            const paper = await sprite('contract.webp', 'surprise--contract');
            const x = rand(0.15, 0.65) * W();
            place(paper, x, -paper.offsetHeight - 40);
            await wait(30);
            paper.classList.add('surprise--move-soft');
            place(paper, x, rand(0.02, 0.1) * H());
            await wait(2400);
            paper.classList.add('surprise--burning');
            noise(2.8, 2200, 400, 0.1, 'highpass');
            await wait(3200);
        },
    };
    // КОНЕЦ РАЗДЕЛА «сценки»

    // НАЧАЛО РАЗДЕЛА «расписание»
    let last = '';
    let busy = false;
    const pick = async () => {
        const choices = [];
        for (const kind of KINDS) if (kind !== last && (await ready(kind))) choices.push(kind);
        return choices.length ? choices[Math.floor(Math.random() * choices.length)] : '';
    };
    const run = async () => {
        if (enabled && !reduce && !busy && !document.hidden) {
            const kind = await pick();
            if (kind) {
                busy = true;
                last = kind;
                try { await SCENES[kind](); } finally {
                    layer.replaceChildren();
                    busy = false;
                }
            }
        }
        setTimeout(run, rand(35000, 70000));
    };
    KINDS.forEach((kind) => NEEDS[kind].forEach(preload));
    setTimeout(run, rand(12000, 20000));
    // Вызвать вручную для проверки: window.dispatchEvent(new CustomEvent('devil-cat:surprise', {detail: {kind: 'wink'}}))
    window.addEventListener('devil-cat:surprise', async (event) => {
        const kind = event.detail && event.detail.kind;
        if (busy || !SCENES[kind] || !(await ready(kind))) return;
        busy = true;
        try { await SCENES[kind](); } finally {
            layer.replaceChildren();
            busy = false;
        }
    });
    // КОНЕЦ РАЗДЕЛА «расписание»
})();
