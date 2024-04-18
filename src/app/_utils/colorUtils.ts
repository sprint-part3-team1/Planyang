export const createRandomColor = (text: string, light = 80) => {
    const crypto = require('crypto');
    const colorCode = crypto.createHash('md5').update(text).digest('hex').substring(0, 6);

    let originR = parseInt(colorCode.substring(0, 2), 16);
    let originG = parseInt(colorCode.substring(2, 4), 16);
    let originB = parseInt(colorCode.substring(4, 6), 16);

    const {r, g, b} = adjustToPastel(originR, originG, originB, light);

    return `#${r.toString(16) + g.toString(16) + b.toString(16)}`;
}

const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const l = Math.max(r, g, b);
    const s = 1 - Math.min(r, g, b);

    const h = s ?
        l === r ?
            (g - b) / s : l === g ?
            2 + (b - r) / s :
            4 + (r - g) / s :
        0;

    return {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        l: (100 * (2 * l - s)) / 2
    }
}

const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4))
    }
}

const adjustToPastel = (r: number, g: number, b: number, light: number) => {
    let {h, s, l} = rgbToHsl(r, g, b);

    s *= 0.5;
    l = light;

    return hslToRgb(h, s, l);
}