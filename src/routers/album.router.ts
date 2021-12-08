import { Router } from "express";
import {
  all,
  filter,
  byId,
  deleteAll,
  songsAlbums,
} from "../controllers/album.controller";
const router = Router();

router.get("/", all);
router.get("/search", filter);
router.get("/songs", songsAlbums);
router.get("/:id", byId);
//SOLO PARA DESARROLLO
router.delete("/", deleteAll);

export default router;
