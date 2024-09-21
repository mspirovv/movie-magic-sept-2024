import fs from 'fs/promises';

async function getDb() {
    const jsonResult = await fs.readFile('./src/db.json', {encoding: "utf-8"})
    const data = JSON.parse(jsonResult);

    return data;  
    
}

 function saveDb(data){
return fs.writeFile('./src/db.json', JSON.stringify(data, {}, 2));


}
async function getAll(){
  const db = await getDb();
    

    return db.movies;

}

async function create(movieData){
 const db = await getDb();

 db.movies.push(movieData);

 return saveDb(db);

}
export default {
    getAll,
    create

}