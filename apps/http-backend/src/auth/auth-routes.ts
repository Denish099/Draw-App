import { Router } from "express";
import { signup, signin, createRoom } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/middleware";
const router: Router = Router();

router.post("/signup", signup);
router.get("/signin", signin);
router.post("/room", authMiddleware, createRoom);

export default router;
