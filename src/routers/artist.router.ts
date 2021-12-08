import { Router } from "express";
import {
  all,
  filter,
  byId,
  deleteAll,
  albumsArtist,
  songsArtist,
} from "../controllers/artist.controller";
const router = Router();

router.get("/", all);
router.get("/search", filter);
router.get("/songs", songsArtist);
router.get("/albums", albumsArtist);
router.get("/:id", byId);
//SOLO PARA DESARROLLO
router.delete("/", deleteAll);

export default router;
