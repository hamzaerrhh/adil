import { Router } from "express";
import admin from "../controllers/admin.js";
const router = Router();

router.post("/addadmin", admin.register);
router.post("/login", admin.login);
export default router;
