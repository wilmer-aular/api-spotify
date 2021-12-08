import { CrudController } from "../cruds";
import { Request, Response } from "express";
import { handlePromise } from "../cruds/handlePromise";

import * as service from "../services/album.service";

const { all, filter, byId, deleteAll } = CrudController(service, "album");

const songsAlbums = (req: Request, res: Response): void => {
  handlePromise(
    service.songsAlbums({ where: { ...req.query } }),
    res,
    "songsAlbum"
  );
};

export { all, filter, byId, deleteAll, songsAlbums };
