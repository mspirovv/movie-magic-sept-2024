import { query, Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = Router();

function toArray(documents){
    return documents.map(document => document.toObject());  
}


router.get('/create', isAuth ,(req,res) => {
    res.render('movies/create')

});

router.post('/create', isAuth , async (req,res) => {
   const movieData = req.body;
   const ownerId = req.user?._id;

   try{
   await  movieService.create(movieData,ownerId);
   
   } catch(err) {
     const errorMessage = Object.values(err.errors)[0]?.message;
      
     return res.render('movies/create', { error: errorMessage , movie: movieData });
   }


  res.redirect('/');

});

router.get('/:movieId/details', async (req,res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const isOwner = movie.owner && req.user?._id === movie.owner?.toString();
    const isAuthenticated = !!req.user;

    res.render('movies/details', { movie, isOwner, isAuthenticated });
});

router.get('/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();

    // Проверка дали movie.casts съществува и не е undefined
    const castIds = (movie.casts || []).map(cast => cast.cast); 

    const casts = await castService.getAllWithout(castIds).lean();

    res.render('movies/attach', { movie, casts });
});

router.post('/:movieId/attach',isAuth,  async (req,res) => {
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

router.get('/:movieId/delete',isAuth, async (req,res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if ( movie.owner?.toString() !== req.user._id){
        res.setError('You cannot delete this movie!');
        return res.redirect('/404');
    };
    await movieService.remove(movieId);

    res.redirect('/');  

});

router.get('/:movieId/edit',isAuth, async (req,res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    res.render('movies/edit', { movie });
});

router.post('/:movieId/edit', isAuth, async (req,res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    await movieService.edit(movieId,movieData);

    res.redirect(`/movies/${movieId}/details`);
})


export default router;