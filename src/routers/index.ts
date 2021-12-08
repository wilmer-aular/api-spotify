import { Router, Request, Response } from "express";
import song from "./song.router";
import artist from "./artist.router";
import album from "./album.router";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  res.send("You have reached the API!");
});

router.use("/artist", artist);
router.use("/album", album);
router.use("/song", song);

export default router;
