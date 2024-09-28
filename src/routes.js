import { Router } from "express";

const router = Router();

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js'

router.use(homeController);
router.use('/movies', movieController);
router.use('/cast', castController);
router.all('*', (req, res) => {
    res.render('404')
});


export default router;