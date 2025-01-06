// ./kernel.js

export const kernelFunction = function (width, height, hue) {
  const i = this.thread.x;
  const pos_y = Math.floor(i / (width * 4));
  const pos_x = Math.floor(i / 4 - pos_y * width);
  const channel = i % 4;
  const normalizedX = pos_x / width;
  const normalizedY = pos_y / height;
  

  const h = (hue * 360) % 360;
  const s = normalizedX;
  const v = 1 - normalizedY;
  
  const c = v * s;
  const hSegment = Math.floor(h / 60) % 6;
  const f = (h / 60) - hSegment;
  const x = c * (1 - Math.abs(f * 2 - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;

  if (hSegment === 0) { r = c; g = x; b = 0; }
  else if (hSegment === 1) { r = x; g = c; b = 0; }
  else if (hSegment === 2) { r = 0; g = c; b = x; }
  else if (hSegment === 3) { r = 0; g = x; b = c; }
  else if (hSegment === 4) { r = x; g = 0; b = c; }
  else if (hSegment === 5) { r = c; g = 0; b = x; }

  // Return specific channel
  if (channel === 0) return Math.floor((r+m) * 255);
  if (channel === 1) return Math.floor((g+m) * 255);
  if (channel === 2) return Math.floor((b+m) * 255);
  return 255;
};