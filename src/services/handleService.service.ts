import { handleToken } from "./generateToken.service";
import { ModelCtor, Model } from "sequelize/types";
import { Op } from "sequelize";
import { CrudService } from "../cruds";
import * as conector from "../conector/spotify.conector";
import { ISongMapper, songMapper } from "../mappers/song.mapper";
import { Song } from "../models/song.model";

export async function perUnit<T extends Model>(
  empoint: string,
  model: ModelCtor<T>,
  mapper: any
): Promise<T> {
  const service = CrudService(model);
  const token: string = await handleToken();
  const data = await conector.getOne(token, empoint);
  return await service.create(mapper(data));
}

export async function perList<T>(
  empoint: string,
  list: any[] = [],
  from: number = 1,
  limit?: number
): Promise<T[]> {
  const limitSend = limit && limit <= 20 ? limit : 20;

  const token: string = await handleToken();

  const { items } = await conector.getAll(token, empoint, from, limitSend);

  if (!items.length) return list;
  list = [...list, ...items];

  if (items.length === 20) {
    const newLimit = limit ? limit - limitSend : limit;
    return await perList(empoint, list, from + 20, newLimit);
  }
  return list;
}

export async function verifySong<Song>(object: ISongMapper): Promise<any> {
  const { songId, albumId } = object;
  const service = CrudService(Song);
  const verifedSong = await service.find({ where: { songId } });
  if (
    verifedSong &&
    verifedSong.songId === songId &&
    verifedSong.albumId === albumId
  ) {
    return verifedSong;
  }
  return await service.create(object);
}

export const songPerAlbum = (
  album: any,
  albumId?: string,
  artistId?: string
): ISongMapper[] => {
  return album.map((i: any) => {
    return songMapper(i, albumId, artistId);
  });
};

export async function deleteMany<T extends Model>(
  list: string[],
  field: string,
  model: ModelCtor<T>
): Promise<void> {
  const service = CrudService(model);
  const where = { where: { [field]: { [Op.in]: list } } };

  return await service.deleteIn(where);
}
