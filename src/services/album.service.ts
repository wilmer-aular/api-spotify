import { CrudService } from "../cruds";
import { Op } from "sequelize";
import { Album } from "../models/album.model";
import { albumMapper, IAlbumMapper } from "../mappers/album.mapper";
import { Song, ISong } from "../models/song.model";
import { mapImage } from "../util/util";
import lodash from "lodash";
import { ISongMapper } from "../mappers/song.mapper";
import * as handle from "./handleService.service";
import { info } from "console";

const serviceAlbum = CrudService(Album);
const serviceSong = CrudService(Song);

export const byId = async (id: any): Promise<any> => {
  let data = await serviceAlbum.find({ where: { albumId: id } });
  if (!data) {
    const [album, songList] = await Promise.all([
      handle.perUnit(`albums/${id}`, Album, albumMapper),
      handle.perList(`albums/${id}/tracks`),
    ]);

    await handlePromise(songList, id);
    data = album.get({ plain: true });
  }
  return mapImage(data);
};

export const songsAlbums = async (filters: any): Promise<ISong[]> => {
  const { ids } = filters.where;
  let list: string[] = ids.split(",");
  const albums: IAlbumMapper[] = await serviceAlbum.filterAll(
    { where: { ids, offset: "0", limit: list.length } },
    "albumId"
  );
  if (albums.length === list.length) {
    return serviceSong.filterAll(filters, "albumId");
  }
  const listPromises = handlePromise2(list);
  await Promise.all([...listPromises]);

  return await serviceSong.filterAll(filters, "albumId");
};

export const filter = async (filters: any): Promise<IAlbumMapper[]> => {
  let albums: IAlbumMapper[] = [];
  const { ids } = filters.where;
  if (!ids) {
    const albums = await serviceAlbum.filterAll(filters);
    return albums.map(mapImage);
  }
  const list: string[] = ids.split(",");
  albums = await serviceAlbum.filterAll(
    { where: { ids, offset: "0", limit: list.length } },
    "albumId"
  );
  if (albums.length === list.length) {
    albums = await serviceAlbum.filterAll(filters, "albumId");
    return albums.map(mapImage);
  }
  const listPromises = handlePromise2(list);
  await Promise.all([...listPromises]);

  albums = await serviceAlbum.filterAll(filters, "albumId");
  return albums.map(mapImage);
};

export const all = async (query?: any): Promise<any[]> => {
  const albums = await serviceAlbum.all(query);
  return albums.map(mapImage);
};

async function handlePromise<T>(songs: any[], id: string): Promise<void> {
  const songsMapped: ISongMapper[] = handle.songPerAlbum(songs, id);

  let clearSong = lodash.uniqBy(songsMapped, "songId");
  const songIds = clearSong.map((i) => i.songId);

  await handle.deleteMany(songIds, "songId", Song);

  await serviceSong.bulkCreate(clearSong);
}

const handlePromise2 = (list: string[]): any[] => {
  const listPromise: any[] = [];

  list.forEach((i: string) => {
    const promise = byId(i);
    listPromise.push(promise);
  });
  return listPromise;
};

//Esto para eliminar todos los campos solo para desarrollar
export const deleteAll = async (): Promise<any> => {
  return await serviceAlbum.deleteAll();
};
