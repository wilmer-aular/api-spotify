import { IModel } from "./genericInterface";

export interface ISongMapper extends IModel {
  songId: string;
  albumId: string;
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  trackNumber: number;
  type: string;
  isLocal: boolean;
}
export const songMapper = (
  data: any,
  idAlbum?: string,
  idArtist?: string
): ISongMapper => {
  let artistId: string;
  let albumId: string;
  const { artists, album } = data;

  if (!idAlbum) {
    albumId = album.id;
  } else {
    albumId = idAlbum;
  }

  const [principalArtist] = artists;
  if (!idArtist) {
    artistId = principalArtist.id;
  } else {
    artistId = idArtist;
  }
  return {
    name: data.name,
    songId: data.id,
    albumId,
    artistId,
    uri: data.url,
    discNumber: data.discNumber,
    durationMs: data.durationMs,
    isLocal: data.isLocal,
    trackNumber: data.trackNumber,
    type: data.type,
    explicit: data.explicit,
  };
};
