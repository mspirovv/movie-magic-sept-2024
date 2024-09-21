import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

//URL /movies/create
router.get('/create', (req,res) => {
    res.render('movies/create')

});

router.post('/create', (req,res) => {
   const movieData = req.body;

movieService.create(movieData);

  res.redirect('/');

});

export default router;