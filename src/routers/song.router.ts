import { Router } from "express";
import { all, filter, byId, deleteAll } from "../controllers/song.controller";
const router = Router();

router.get("/", all);
router.get("/search", filter);
router.get("/:id", byId);
//SOLO PARA DESARROLLO
router.delete("/", deleteAll);

export default router;
