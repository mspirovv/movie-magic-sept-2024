
import Movie from '../models/Movie.js';

//TODO
const getAll = async (filter = {}) => {
    try {
        let movies = await Movie.find();
     
        if (filter.search && typeof filter.search === 'string') {
            const searchTerm = filter.search.toLowerCase();
            movies = movies.filter(movie => 
                movie.title && movie.title.toLowerCase().includes(searchTerm)
            );
        }
        if (filter.genre && typeof filter.genre === 'string') {
            const searchTerm = filter.genre.toLowerCase();
            movies = movies.filter(movie => 
                movie.genre && movie.genre.toLowerCase().includes(searchTerm)
            );
        }

        if (filter.year) {
            const searchTerm = filter.year
            movies = movies.filter(movie => 
                movie.year && movie.year.includes(searchTerm)
            );
        }

        return movies;
    } catch (error) {
        console.error("Error in getAll:", error);
        throw error; 
    }
};


const create = (movie) =>  Movie.create(movie); 

const getOne = (movieId) =>  Movie.findById(movieId).populate('casts');

const attach = async (movieId,castId) => {
    // const movie = await Movie.findById(movieId);
    // movie.casts.push(castId)
    // return  movie.save();
   
    return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
}

export default {
    getAll,
    create,
    getOne,
    attach,
}   