import { query, Router } from "express";
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

router.get('/:movieId/details', async (req,res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    movie.ratingView = getRatingViewData(movie.rating);

    res.render('movies/details', { movie });
})

router.get('/search', async (req, res) => {
    const query = req.query;
    try {
        const movies = await movieService.getAll(query);
        res.render('home', { isSearch: true, movies });
    } catch (error) {
        res.status(500).send("An error occurred while processing your search: " + error.message);
    }
});




function getRatingViewData(rating){
    if (!Number.isInteger(rating)){
        return 'n/a';
    }
    return '&#x2605'.repeat(rating)
}
export default router;