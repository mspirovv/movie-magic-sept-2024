import fs from 'fs/promises';

async function getDb() {
    const jsonResult = await fs.readFile('./src/db.json', {encoding: "utf-8"})
    const data = JSON.parse(jsonResult);

    return data;  
    
}

async function getMovies(){
  const db = await getDb();
    

    return db.movies;

}

export default {
    getMovies

}