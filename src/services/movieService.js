import uniqid from 'uniqid';

import movieData  from "../data/movieData.js";

const getAll = async (filter = {}) => {
    try {
        let movies = await movieData.getAll();
     
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


const create = (movie) => {

    movie.id = uniqid();
    movie.rating = Number(movie.rating);
    return movieData.create(movie); 

}

const getOne = async (movieId) => {
    const movies = await movieData.getAll();

    const resultMovie = movies.find(movie => movie.id == movieId);

    return resultMovie;

}
export default {
    getAll,
    create,
    getOne,
}