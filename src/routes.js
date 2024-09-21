import { Router } from "express";

const router = Router();

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

router.use(homeController);
router.use('/movies', movieController)

export default router;