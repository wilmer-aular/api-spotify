import { CrudService } from "../cruds";
import lodash from "lodash";
import { Artist } from "../models/artist.model";
import { Album } from "../models/album.model";
import { ISong, Song } from "../models/song.model";
import { mapImage } from "../util/util";
import { artistMapper, IArtistMapper } from "../mappers/artist.mapper";
import { albumMapper, IAlbumMapper } from "../mappers/album.mapper";
import { ISongMapper } from "../mappers/song.mapper";

import * as handle from "./handleService.service";
const serviceArtist = CrudService(Artist);
const serviceAlbum = CrudService(Album);
const serviceSong = CrudService(Song);

export const byId = async (id: any): Promise<any[]> => {
  let data = await serviceArtist.find({ where: { artistId: id } });
  if (!data) {
    data = await handleById(id);
  }
  return mapImage(data);
};

export const songsArtist = async (filters?: any): Promise<ISong[]> => {
  const { ids } = filters.where;
  const list: string[] = ids.split(",");
  const artists: IArtistMapper[] = await serviceArtist.filterAll(
    { where: { ids, offset: "0", limit: list.length } },
    "artistId"
  );
  if (artists.length === list.length) {
    return serviceSong.filterAll(filters, "artistId");
  }
  const listPromises = handlePromise2(list);
  await Promise.all([...listPromises]);
  return await serviceSong.filterAll(filters, "artistId");
};

export const albumsArtist = async (filters: any): Promise<IAlbumMapper[]> => {
  const { ids } = filters.where;
  let albums: IAlbumMapper[] = [];
  const list: string[] = ids.split(",");

  const artists: IArtistMapper[] = await serviceArtist.filterAll(
    { where: { ids, offset: "0", limit: list.length } },
    "artistId"
  );
  if (artists.length === list.length) {
    albums = await serviceAlbum.filterAll(filters, "artistId");
    return albums.map(mapImage);
  }
  const listPromises = handlePromise2(list);
  await Promise.all([...listPromises]);
  albums = await serviceAlbum.filterAll(filters, "artistId");
  return albums.map(mapImage);
};

export const filter = async (filters: any): Promise<IArtistMapper[]> => {
  let artists: IArtistMapper[] = [];
  const { ids } = filters.where;
  if (!ids) {
    artists = await serviceArtist.filterAll(filters);
    return artists.map(mapImage);
  }
  const list: string[] = ids.split(",");
  artists = await serviceArtist.filterAll(
    { where: { ids, offset: "0", limit: list.length } },
    "artistId"
  );
  if (artists.length === list.length) {
    artists = await serviceArtist.filterAll(filters, "artistId");
    return artists.map(mapImage);
  }
  const listPromises = handlePromise2(list);
  await Promise.all([...listPromises]);
  artists = await serviceArtist.filterAll(filters, "artistId");
  return artists.map(mapImage);
};

export const all = async (query?: any): Promise<any[]> => {
  const artists = await serviceArtist.all(query);
  return artists.map(mapImage);
};

const handleById = async (id: any): Promise<any> => {
  let songs: ISongMapper[] = [];
  let ids: string[];
  const listPromise: Promise<any>[] = [];

  const artist = await handle.perUnit(`artists/${id}`, Artist, artistMapper);
  const items = await handle.perList(`artists/${id}/albums`);
  const mapsAlbums: IAlbumMapper[] = items.map((i: any) => albumMapper(i, id));
  ids = mapsAlbums.map((i: IAlbumMapper) => i.albumId);

  ids.forEach((i: string) => {
    const songs = handle.perList(`albums/${i}/tracks`);
    listPromise.push(songs);
  });

  const promiseAll: any[] = await Promise.allSettled(listPromise);

  if (promiseAll.length) {
    promiseAll.forEach((e, index) => {
      if (e.status === "fulfilled") {
        const AlbumSongsMapped: ISongMapper[] = handle.songPerAlbum(
          e.value,
          ids[index],
          id
        );
        songs = [...songs, ...AlbumSongsMapped];
      }
    });
  }
  await handlePromise(songs, mapsAlbums, ids);
  return artist.get({ plain: true });
};

async function handlePromise<T>(
  songs: ISongMapper[],
  Albums: IAlbumMapper[],
  albumIds: string[]
): Promise<void> {
  let clearAlbum = lodash.uniqBy(Albums, "albumId");
  let clearSong = lodash.uniqBy(songs, "songId");
  const songIds = clearSong.map((i) => i.songId);

  await handle.deleteMany(albumIds, "albumId", Album);
  await handle.deleteMany(songIds, "songId", Song);

  await Promise.all([
    serviceAlbum.bulkCreate(clearAlbum),
    serviceSong.bulkCreate(clearSong),
  ]);
}
const handlePromise2 = (list: string[]): any[] => {
  const listPromise: any[] = [];
  list.forEach((i: string) => {
    const promise = handleById(i);
    listPromise.push(promise);
  });
  return listPromise;
};

//Esto para eliminar todos los campos solo para desarrollar
export const deleteAll = async (): Promise<any> => {
  return await serviceArtist.deleteAll();
};
