import { Router } from "express";
const router = Router();

import * as analyticsCtrl from "../controllers/analytics.controller";
import { authJwt } from "../middlewares";

router.post("/", authJwt.verifyToken, analyticsCtrl.getAnalyticsById);

router.post("/tracking", authJwt.verifyToken, analyticsCtrl.updateAnalytic);
export default router;
