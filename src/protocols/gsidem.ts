// https://qiita.com/Kanahiro/items/1e9c1a4ad6be76b27f0f

import { RequestParameters, ResponseCallback } from "maplibre-gl";

const gsidem2terrainrgb = (r: number, g: number, b: number): number[] => {
  let height = r * 655.36 + g * 2.56 + b * 0.01;
  if (r === 128 && g === 0 && b === 0) {
    height = 0;
  } else if (r >= 128) {
    height -= 167772.16;
  }
  height += 100000;
  height *= 10;
  const tB = (height / 256 - Math.floor(height / 256)) * 256;
  const tG =
    (Math.floor(height / 256) / 256 -
      Math.floor(Math.floor(height / 256) / 256)) *
    256;
  const tR =
    (Math.floor(Math.floor(height / 256) / 256) / 256 -
      Math.floor(Math.floor(Math.floor(height / 256) / 256) / 256)) *
    256;
  return [tR, tG, tB];
};

export const tile = (
  params: RequestParameters,
  callback: ResponseCallback<any>
) => {
  const image = new Image();
  image.crossOrigin = "";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length / 4; i++) {
      const tRGB = gsidem2terrainrgb(
        imageData.data[i * 4],
        imageData.data[i * 4 + 1],
        imageData.data[i * 4 + 2]
      );
      imageData.data[i * 4] = tRGB[0];
      imageData.data[i * 4 + 1] = tRGB[1];
      imageData.data[i * 4 + 2] = tRGB[2];
    }
    context.putImageData(imageData, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      // ここで返すデータは、画像のArrayBuffer()でなければならない
      return blob.arrayBuffer().then((arr) => callback(null, arr, null, null));
    });
  };
  image.src = params.url.replace("gsidem://", "");
  return { cancel: () => {} };
};
