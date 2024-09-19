import { Router } from "express";

const router = Router();

import homeController from './controllers/homeController.js';

router.use(homeController);

export default router;