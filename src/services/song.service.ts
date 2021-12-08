import { CrudService } from "../cruds";

import { Op } from "sequelize";
import { Song, ISong } from "../models/song.model";
import * as handle from "./handleService.service";
import { songMapper } from "../mappers/song.mapper";
const service = CrudService(Song);

export const byId = async (id: any): Promise<ISong[]> => {
  let data = await service.find({ where: { songId: id } });
  if (!data) {
    const empoint = `tracks/${id}`;
    data = await handle.perUnit(empoint, Song, songMapper);
  }
  return data;
};
export const filter = async (filters: any): Promise<any[]> => {
  const { ids } = filters.where;
  const songs: ISong[] = await service.filterAll(filters, "songId");
  if (!ids) return songs;
  const list: string[] = ids.split(",");
  if (songs.length === list.length) {
    return songs;
  }
  const listPromise = handlePromise(list);
  return await Promise.all([...listPromise]);
};

export const all = async (query?: any): Promise<any[]> => {
  return await service.all(query);
};

//Esto para eliminar todos los campos solo para desarrollar
export const deleteAll = async (): Promise<any> => {
  return await service.deleteAll();
};

const handlePromise = (list: string[]): any[] => {
  const listPromise: any[] = [];
  list.forEach((i: string) => {
    const promise = byId(i);
    listPromise.push(promise);
  });
  return listPromise;
};
