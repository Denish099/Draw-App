import { Router } from "express";
import { signup, signin, createRoom } from "../controller/auth.controller";
const router: Router = Router();

router.post("/signup", signup);
router.get("/signin", signin);
router.post("/room", authmiddleware, createRoom);

export default router;
