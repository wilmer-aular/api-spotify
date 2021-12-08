import { CrudController } from "../cruds";
import { Request, Response } from "express";
import { handlePromise } from "../cruds/handlePromise";

import * as service from "../services/artist.service";

const { all, filter, byId, deleteAll } = CrudController(service, "artist");

const albumsArtist = (req: Request, res: Response): void => {
  handlePromise(
    service.albumsArtist({ where: { ...req.query } }),
    res,
    "albumsArtist"
  );
};

const songsArtist = (req: Request, res: Response): void => {
  handlePromise(
    service.songsArtist({ where: { ...req.query } }),
    res,
    "songsArtist"
  );
};

export { all, filter, byId, deleteAll, albumsArtist, songsArtist };
