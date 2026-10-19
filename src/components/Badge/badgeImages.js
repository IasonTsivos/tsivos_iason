import profilePic from "../../assets/icons/prof1.jpg";

// Lanyard paints faces at 1024px wide on a 1.6 x 2.25 card
const W = 1024;
const H = 1440;
const PURPLE = "#a855f7";
const DEEP = "#6d28d9";
const MONO = "'Geist Mono', monospace";
export const CARD_COLOR = "#0c0c0e";

const roundedRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const gradient = (ctx, x0, y0, x1, y1) => {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, PURPLE);
  g.addColorStop(1, DEEP);
  return g;
};

const canvas2d = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext("2d")];
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const drawFront = (img) => {
  const [canvas, ctx] = canvas2d(W, H);
  ctx.fillStyle = CARD_COLOR;
  ctx.fillRect(0, 0, W, H);

  // Header band; the clip slot is cut through it by the card geometry
  ctx.fillStyle = gradient(ctx, 0, 0, W, 0);
  ctx.fillRect(0, 0, W, 170);

  // Photo (object-fit: cover)
  const px = 80;
  const py = 230;
  const pw = W - px * 2;
  const ph = 790;
  ctx.save();
  roundedRect(ctx, px, py, pw, ph, 32);
  ctx.clip();
  const scale = Math.max(pw / img.width, ph / img.height);
  const iw = img.width * scale;
  const ih = img.height * scale;
  ctx.drawImage(img, px + (pw - iw) / 2, py + (ph - ih) / 2, iw, ih);
  ctx.restore();
  ctx.lineWidth = 4;
  ctx.strokeStyle = gradient(ctx, px, py, px + pw, py + ph);
  roundedRect(ctx, px, py, pw, ph, 32);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 92px Sora, sans-serif";
  ctx.fillText("TSIVOS IASON", px, 1140);
  ctx.fillStyle = gradient(ctx, px, 0, px + 700, 0);
  ctx.font = "700 46px Sora, sans-serif";
  ctx.fillText("COMPUTER & SOFTWARE", px, 1215);
  ctx.fillText("ENGINEER", px, 1272);
  ctx.fillStyle = "#a1a1aa";
  ctx.font = `500 32px ${MONO}`;
  ctx.fillText("~/rotterdam/netherlands", px, 1370);

  return canvas.toDataURL("image/png");
};

const drawBack = () => {
  const [canvas, ctx] = canvas2d(W, H);
  ctx.fillStyle = CARD_COLOR;
  ctx.fillRect(0, 0, W, H);

  // Soft purple glow behind the monogram
  const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
  glow.addColorStop(0, "rgba(168, 85, 247, 0.28)");
  glow.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = gradient(ctx, W / 2 - 220, 0, W / 2 + 220, 0);
  ctx.font = "700 300px Sora, sans-serif";
  ctx.fillText("IT", W / 2, H / 2 - 40);
  ctx.fillStyle = "#a1a1aa";
  ctx.font = `500 40px ${MONO}`;
  ctx.fillText("tsivos-iason", W / 2, H / 2 + 170);

  return canvas.toDataURL("image/png");
};

// A wide tile: Lanyard repeats it along the band with its height spanning the band width
const drawStrap = () => {
  const [canvas, ctx] = canvas2d(640, 128);
  ctx.fillStyle = "#141416";
  ctx.fillRect(0, 0, 640, 128);
  ctx.fillStyle = "#c084fc";
  ctx.font = "700 52px Sora, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("IASON TSIVOS", 320, 68);
  return canvas.toDataURL("image/png");
};

let cached;

export default function loadBadgeImages() {
  cached ??= Promise.all([
    loadImage(profilePic),
    document.fonts?.load("700 64px Sora").catch(() => {}),
    document.fonts?.load(`500 32px ${MONO}`).catch(() => {}),
  ]).then(([img]) => ({ front: drawFront(img), back: drawBack(), strap: drawStrap() }));
  return cached;
}
