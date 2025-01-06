// ./kernel.js

export const kernelFunction = function (width, height, hue) {
  const i = this.thread.x;
  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;
  const normalizedX = x / width;
  const normalizedY = y / height;
};
