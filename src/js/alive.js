// ФАЙЛ: src/js/alive.js
// НАЗНАЧЕНИЕ: «оживляет» картинки визитки: глаза горят и вспыхивают, кот дышит, по стеклу текут капли,
// вокруг кружат мухи, летят искры и дым, бьют молнии. Сама картинка не меняется — всё живое лежит
// накладками поверх неё, поэтому то же самое подходит к любой новой картинке.
// КАК ПОДКЛЮЧИТЬ: <figure class="alive" data-alive='{"eyes":[[x, y, r, "#цвет"]], "fx":["breath"]}'><img …></figure>
//   x, y — центр глаза в процентах ширины и высоты картинки, r — радиус свечения в процентах ширины;
//   fx — список эффектов: breath (дыхание), rain (капли на стекле), flies (мухи), embers (искры),
//   smoke (дым), lightning (молнии). Мухи кружат вокруг точки "flies": [x, y, радиус в % ширины].
//   "pupils": [[x, y, r, k], …] — черепа в глазах пульсируют (центр и радиус глаза в % ширины; k — сплющенность
//              окна по высоте для миндалевидных кошачьих глаз, 1 — круглый глаз, по умолчанию 1).
// При «уменьшить движение» в системе остаётся только ровное свечение глаз.
// Касание или наведение на картинку — глаза вспыхивают (палец и мышь равноправны).
(() => {
    'use strict';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (min, max) => min + Math.random() * (max - min);

    // НАЧАЛО ФУНКЦИИ make — создаёт элемент с классом внутри родителя
    const make = (tag, className, parent) => {
        const node = document.createElement(tag);
        node.className = className;
        parent.appendChild(node);
        return node;
    };
    // КОНЕЦ ФУНКЦИИ make

    // НАЧАЛО ФУНКЦИИ addEyes — свечение огоньков своим цветом, со своим ритмом (пентаграмма и т. п.)
    // skulls — в глазах черепа: тогда на сами глаза (первые два огонька) кольца-ореолы НЕ кладутся.
    // Алексей 14.11: «черепа должны пульсировать внутри глаз, а не появляться какие-то круги непонятные
    // цветные» — живут только черепа в зрачках (addPupils), цветных колец поверх глаз нет
    const addEyes = (layer, eyes, skulls) => {
        eyes.forEach(([x, y, r, color], index) => {
            if (skulls && index < 2) return;
            const eye = make('span', 'alive-eye', layer);
            eye.style.setProperty('--x', `${x}%`);
            eye.style.setProperty('--y', `${y}%`);
            eye.style.setProperty('--r', `${r}%`);
            eye.style.setProperty('--glow', color);
            eye.style.animationDelay = `${-index * 1.3}s`;
            eye.style.animationDuration = `${rand(2.6, 3.6).toFixed(2)}s`;
        });
    };
    // КОНЕЦ ФУНКЦИИ addEyes

    // НАЧАЛО ФУНКЦИИ addPupils — черепа в глубине зрачков медленно пульсируют: растут и снова сжимаются.
    // Поверх картинки кладётся её же копия, видимая только в мягком круге зрачка, и эта копия плавно
    // увеличивается вокруг центра зрачка — так «дышит» сам череп, а не наклейка поверх него.
    const addPupils = (layer, image, pupils) => {
        const place = () => {
            const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1;
            pupils.forEach(([x, y, r, k = 1]) => {
                // Неподвижное «окно» размером с глаз (маска) и внутри него — растущая копия картинки.
                // Маска на самой копии росла бы вместе с ней и при сильном росте вылезала бы за глаз (14.11)
                const window_ = make('span', 'alive-pupil', layer);
                window_.style.setProperty('--x', `${x}%`);
                window_.style.setProperty('--y', `${y}%`);
                // радиус в % ширины; по высоте тот же круг — в % высоты
                window_.style.setProperty('--rx', `${r}%`);
                window_.style.setProperty('--ry', `${(r * ratio * k).toFixed(2)}%`);
                const copy = make('img', 'alive-pupil__skull', window_);
                copy.alt = '';
                copy.src = image.currentSrc || image.src;
                // оба черепа пульсируют в такт, ритм задан в CSS
            });
        };
        if (image.complete && image.naturalWidth) place();
        else image.addEventListener('load', place, { once: true });
    };
    // КОНЕЦ ФУНКЦИИ addPupils

    // НАЧАЛО ФУНКЦИИ addRain — капли медленно сползают по стеклу, иногда замирают
    const addRain = (layer) => {
        for (let i = 0; i < 14; i++) {
            const drop = make('span', 'alive-drop', layer);
            drop.style.left = `${rand(2, 98)}%`;
            drop.style.setProperty('--size', `${rand(0.5, 1.3).toFixed(2)}`);
            drop.style.animationDuration = `${rand(7, 16).toFixed(1)}s`;
            drop.style.animationDelay = `${-rand(0, 16).toFixed(1)}s`;
        }
    };
    // КОНЕЦ ФУНКЦИИ addRain

    // НАЧАЛО ФУНКЦИИ addRising — искры или клочья дыма поднимаются снизу и гаснут
    const addRising = (layer, className, count, [from, to]) => {
        for (let i = 0; i < count; i++) {
            const bit = make('span', className, layer);
            bit.style.left = `${rand(from, to)}%`;
            bit.style.setProperty('--drift', `${rand(-30, 30).toFixed(0)}px`);
            bit.style.setProperty('--size', `${rand(0.6, 1.4).toFixed(2)}`);
            bit.style.animationDuration = `${rand(3.5, 8).toFixed(1)}s`;
            bit.style.animationDelay = `${-rand(0, 8).toFixed(1)}s`;
        }
    };
    // КОНЕЦ ФУНКЦИИ addRising

    // НАЧАЛО ФУНКЦИИ addFlies — две мухи кружат «восьмёрками» вокруг головы, иногда дёргаются в сторону
    // (14.11: стрекозы из CSS отменены — выглядели летающими ёршиками; картинка насекомого — через flySprite)
    const addFlies = (figure, layer, [cx, cy, radius], sprite) => {
        const flies = [0, 1].map(() => {
            let fly;
            if (sprite) {
                // Насекомое-картинка (flySprite); если её нет — муха из CSS
                fly = make('img', 'alive-fly--sprite', layer);
                fly.alt = '';
                fly.src = sprite;
                fly.addEventListener('error', () => {
                    const plain = make('span', 'alive-fly', layer);
                    make('i', 'alive-fly__wing', plain);
                    make('i', 'alive-fly__wing alive-fly__wing--right', plain);
                    fly.replaceWith(plain);
                    item.fly = plain;
                }, { once: true });
            } else {
                fly = make('span', 'alive-fly', layer);
                make('i', 'alive-fly__wing', fly);
                make('i', 'alive-fly__wing alive-fly__wing--right', fly);
            }
            const item = { fly, phase: rand(0, Math.PI * 2), speed: rand(0.0011, 0.0017), jitter: 0 };
            return item;
        });
        const tick = (time) => {
            if (!document.hidden) {
                const width = figure.clientWidth;
                const height = figure.clientHeight;
                for (const item of flies) {
                    if (Math.random() < 0.01) item.jitter = rand(-1, 1);
                    item.jitter *= 0.96;
                    const angle = time * item.speed + item.phase;
                    const x = cx / 100 * width + Math.sin(angle) * radius / 100 * width + item.jitter * 18;
                    const y = cy / 100 * height + Math.sin(angle * 2) * radius / 220 * width + item.jitter * 10;
                    const heading = Math.cos(angle) > 0 ? 1 : -1;
                    item.fly.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scaleX(${heading})`;
                }
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
    // КОНЕЦ ФУНКЦИИ addFlies

    // НАЧАЛО ФУНКЦИИ addLightning — изредка через кадр бьёт ломаная молния и картинка вспыхивает
    const addLightning = (figure, layer) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'alive-lightning');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');
        layer.appendChild(svg);
        const strike = () => {
            if (!document.hidden) {
                let x = rand(5, 95);
                let y = rand(0, 20);
                const points = [`${x.toFixed(1)},${y.toFixed(1)}`];
                while (y < 100) {
                    x += rand(-9, 9);
                    y += rand(6, 14);
                    points.push(`${x.toFixed(1)},${Math.min(y, 100).toFixed(1)}`);
                }
                svg.innerHTML = `<polyline points="${points.join(' ')}"/>`;
                figure.classList.add('alive--flash');
                setTimeout(() => figure.classList.remove('alive--flash'), 140);
            }
            setTimeout(strike, rand(2500, 7000));
        };
        setTimeout(strike, rand(800, 2500));
    };
    // КОНЕЦ ФУНКЦИИ addLightning

    // НАЧАЛО ФУНКЦИИ setup — одна живая картинка
    const setup = (figure) => {
        /** Настройки из data-alive.
         * @type {{eyes?: Array<Array<number|string>>, fx?: string[], embersFrom?: number[], smokeFrom?: number[],
         *         flies?: number[], flySprite?: string, pupils?: number[][]}} */
        let config;
        try { config = JSON.parse(figure.dataset.alive || '{}'); } catch { config = {}; }
        const fx = new Set(reduce ? [] : config.fx || []);
        const body = figure.querySelector('.alive-body') || figure;
        const layer = make('div', 'alive-layer', body);
        layer.setAttribute('aria-hidden', 'true');
        const image = body.querySelector('img');
        const pupils = !reduce && config.pupils && image ? config.pupils : null;
        // Кольца на глаза не кладутся, если в глазах черепа, — даже при «меньше движения», где черепа не пульсируют
        addEyes(layer, config.eyes || [], Boolean(config.pupils));
        if (pupils) addPupils(layer, image, pupils);
        if (fx.has('breath')) figure.classList.add('alive--breath');
        if (fx.has('rain')) addRain(layer);
        if (fx.has('embers')) addRising(layer, 'alive-ember', 22, config.embersFrom || [5, 95]);
        if (fx.has('smoke')) addRising(layer, 'alive-smoke', 7, config.smokeFrom || [20, 80]);
        if (fx.has('flies') && config.flies) addFlies(figure, layer, config.flies, config.flySprite);
        if (fx.has('lightning')) addLightning(figure, layer);
        // Касание или наведение — глаза вспыхивают; второй раз подряд вспыхнуть нельзя, пока не погасли
        const flare = () => {
            if (figure.classList.contains('alive--flare')) return;
            figure.classList.add('alive--flare');
            setTimeout(() => figure.classList.remove('alive--flare'), 1600);
        };
        figure.addEventListener('pointerenter', flare);
        figure.addEventListener('pointerdown', flare);
    };
    // КОНЕЦ ФУНКЦИИ setup

    document.querySelectorAll('.alive').forEach(setup);
})();
