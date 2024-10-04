
import Movie from '../models/Movie.js';

//TODO
const getAll =  (filter = {}) => {
    try {
        let moviesQuery =  Movie.find();
     
        if (filter.search && typeof filter.search === 'string') {
            moviesQuery.find({ title: {$regex: filter.search, $options: 'i'} });
            // moviesQuery.regex('title', new RegExp(filter.search, 'i'));
             

        }
           
        
        if (filter.genre && typeof filter.genre === 'string') {
            moviesQuery.find({genre: filter.genre.toLowerCase()});
            // moviesQuery.where('genre').equals(filter.genre);
        }

        if (filter.year) {
            moviesQuery.find({year: filter.year});
            // moviesQuery.where('year').equals(filter.year);

        }

        return moviesQuery;
    } catch (error) {
        console.error("Error in getAll:", error);
        throw error; 
    }
};


const create = (movie,ownerId) =>  Movie.create({...movie, owner: ownerId}); 

const getOne = (movieId) =>  Movie.findById(movieId).populate('casts.cast');

const attach = async (movieId,castId,character) => {
    // const movie = await Movie.findById(movieId);
    // movie.casts.push(castId)
    // return  movie.save();
   
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: {cast: castId,character }}});
}

export default {
    getAll,
    create,
    getOne,
    attach,
}   