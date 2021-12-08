import { IModel, IImage } from "../mappers/genericInterface";
import { toJsonList } from "./arra.util";

export const mapImage = <T extends IModel>(i: T) => {
  const { images } = i;
  if (!images || !images.length) return i;

  const imageMapped = toJsonList(i.images);

  const transformeImage = imageMapped.map((i: any): IImage => {
    return {
      height: toInt(i.height),
      url: i.url,
      width: toInt(i.width),
    };
  });

  return {
    ...i,
    images: transformeImage,
  };
};

export const toInt = (value: any) =>
  value && value.isLosslessNumber ? parseInt(value.value) : 0;
