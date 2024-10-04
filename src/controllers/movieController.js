import { query, Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const router = Router();

function toArray(documents){
    return documents.map(document => document.toObject());  
}


router.get('/create', (req,res) => {
    res.render('movies/create')

});

router.post('/create', (req,res) => {
   const movieData = req.body;
   const ownerId = req.user?._id;

movieService.create(movieData,ownerId);

  res.redirect('/');

});

router.get('/:movieId/details', async (req,res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const isOwner = req.user?._id == movie.owner;

    res.render('movies/details', { movie });
});

router.get('/:movieId/attach', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();

    // Проверка дали movie.casts съществува и не е undefined
    const castIds = (movie.casts || []).map(cast => cast.cast); 

    const casts = await castService.getAllWithout(castIds).lean();

    res.render('movies/attach', { movie, casts });
});

router.post('/:movieId/attach', async (req,res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const character = req.body.character;

    await movieService.attach(movieId,castId,character);
    

    res.redirect(`/movies/${movieId}/details`);


});

router.get('/search', async (req, res) => {
    const filter = req.query;
    try {
        const movies = await movieService.getAll(filter);
        res.render('home', { isSearch: true, movies: toArray(movies) , filter });
    } catch (error) {
        res.status(500).send("An error occurred while processing your search: " + error.message);
    }
});





export default router;