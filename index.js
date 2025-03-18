const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { open } = require('sqlite');
const { resolveSoa } = require('dns');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: 'games_database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchAllGames(){
  let query = 'SELECT * FROM games'
  let response = await db.all(query, [])
  return {games : response}
}

//Exercise 1: Get All Games
app.get('/games', async (req,res)=>{
  try{
    let results = await fetchAllGames();
    if(results.games.length === 0 ){
      res.status(404).json({message : 'Games not found'})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
