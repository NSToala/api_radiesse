import { Router } from "express";
const router = Router();

import * as coursesCtrl from "../controllers/courses.controller";
import { authJwt } from "../middlewares";

router.get("/", authJwt.verifyToken, coursesCtrl.getCourses);

router.get("/:courseId", authJwt.verifyToken, coursesCtrl.getCourseById);


export default router;
