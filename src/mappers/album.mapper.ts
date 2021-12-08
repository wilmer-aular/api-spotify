import { IModel } from "./genericInterface";
import { listToString } from "../util/arra.util";

export interface IAlbumMapper extends IModel {
  albumId: string;
  albumGroup: string;
  albumType: string;
  artists?: string;
  totalTracks: number;
  releaseDate: string;
}

export const albumMapper = (data: any, idArtist?: string): IAlbumMapper => {
  let artistId: string;
  const { images, artists } = data;

  const parseImages = listToString(images);

  const [principalArtist] = artists;
  if (!idArtist) {
    artistId = principalArtist.id;
  } else {
    artistId = idArtist;
  }
  return {
    name: data.name,
    images: parseImages,
    uri: data.uri,
    albumId: data.id,
    artistId,
    albumGroup: data.albumGroup,
    albumType: data.albumType,
    totalTracks: data.totalTracks,
    releaseDate: data.releaseDate,
  };
};
