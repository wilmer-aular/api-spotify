import { IModel } from "./genericInterface";
import { listToString } from "../util/arra.util";

export interface IArtistMapper extends IModel {
  popularity: number;
  genres: string[];
  totalFallowers: number;
}

export const artistMapper = (data: any): IArtistMapper => {
  const { popularity, genres, followers, name, images, uri, id } = data;
  const parseImages = listToString(images);
  return {
    name: name,
    artistId: id,
    popularity,
    images: parseImages,
    genres: genres.join(),
    totalFallowers: followers[1],
    uri,
  };
};
