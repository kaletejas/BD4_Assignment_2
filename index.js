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

//fn 1
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
//fn 2
async function fetchGameById(id){
  let query = 'SELECT * FROM games WHERE id =?'
  let response = await db.all(query, [id])
  return {games : response}
}

//Exercise 2: Get Game by ID
app.get('/games/details/:id', async (req,res)=>{
  let id = req.params.id;
  try{
    let results = await fetchGameById(id);
    if(results.games.length === 0 ){
      res.status(404).json({message : 'Game not found for id: ' + id})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})

//fn 3
async function fetchGameByGenre(genre){
  let query = 'SELECT * FROM games WHERE genre =?'
  let response = await db.all(query, [genre])
  return {games : response}
}

//Exercise 3: Get Games by Genre
app.get('/games/genre/:genre', async (req,res)=>{
  let genre = req.params.genre;
  try{
    let results = await fetchGameByGenre(genre);
    if(results.games.length === 0 ){
      res.status(404).json({message : 'Game not found for genre: ' + genre})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})

//fn 4
async function fetchGameByPlatform(platform){
  let query = 'SELECT * FROM games WHERE platform =?'
  let response = await db.all(query, [platform])
  return {games : response}
}

//Exercise 4: Get Games by Platform
app.get('/games/platform/:platform', async (req,res)=>{
  let platform = req.params.platform;
  try{
    let results = await fetchGameByPlatform(platform);
    if(results.games.length === 0 ){
      res.status(404).json({message : 'Game not found for platform: ' + platform})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})

//fn 5
async function sortGamesByRating(){
  let query = 'SELECT * FROM games ORDER BY rating DESC'
  let response = await db.all(query, [])
  return {games : response}
}

//Exercise 5: Get Games Sorted by Rating
app.get('/games/sort-by-rating', async (req,res)=>{
  try{
    let results = await sortGamesByRating();
    if(results.games.length === 0 ){
      res.status(404).json({message : 'Game not found'})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})

//fn 6
async function fetchAllPlayers(){
  let query = 'SELECT * FROM players'
  let response = await db.all(query, [])
  return {players : response}
}
//Exercise 6: Get All Players
app.get('/players', async (req,res)=>{
  try{
    let results = await fetchAllPlayers();
    if(results.players.length === 0 ){
      res.status(404).json({message : 'Players not found'})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})


//fn 7
async function fetchPlayerById(id){
  let query = 'SELECT * FROM players WHERE id=?'
  let response = await db.all(query, [id])
  return {players : response}
}
//Exercise 7: Get Player by ID
app.get('/players/details/:id', async (req,res)=>{
  let id = req.params.id;
  try{
    let results = await fetchPlayerById(id);
    if(results.players.length === 0 ){
      res.status(404).json({message : 'Players not found for id: '+ id})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})
//fn 8
async function fetchPlayerByPlatform(platform){
  let query = 'SELECT * FROM players WHERE platform=?'
  let response = await db.all(query, [platform])
  return {players : response}
}
//Exercise 8: Get Players by Platform
app.get('/players/platform/:platform', async (req,res)=>{
  let platform = req.params.platform;
  try{
    let results = await fetchPlayerByPlatform(platform);
    if(results.players.length === 0 ){
      res.status(404).json({message : 'Players not found for platform: '+ platform})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})

//fn 9
async function sortPlayersByRating(){
  let query = 'SELECT * FROM players ORDER BY rating DESC'
  let response = await db.all(query, [])
  return {players : response}
}
//Exercise 9: Get Players Sorted by Rating
app.get('/players/sort-by-rating', async (req,res)=>{
  try{
    let results = await sortPlayersByRating();
    if(results.players.length === 0 ){
      res.status(404).json({message : 'Players not found'})
    }
    res.status(200).json(results)
  }catch(error){
    res.status(500).json({error : error.message})
  }
})
//fn 10
async function fetchAllTournaments(){
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, [])
  return {tournaments : response}
}
//Exercise 10: Get All Tournaments
app.get('/tournaments', async (req,res)=>{
  try{
    let results = await fetchAllTournaments();
    if(results.tournaments.length === 0){
      return res.status(404).json({message : 'Tournaments not found'})
    }
    res.status(200).json(results)
  }catch(error){
    return res.status(500).json({error : error.message})
  }
})
//fn 11
async function fetchTournamentById(id){
  let query = 'SELECT * FROM tournaments WHERE id =?';
  let response = await db.all(query, [id])
  return {tournaments : response}
}
//Exercise 11: Get Tournament by ID
app.get('/tournaments/details/:id', async (req,res)=>{
  let id = req.params.id;
  try{
    let results = await fetchTournamentById(id);
    if(results.tournaments.length === 0){
      return res.status(404).json({message : 'Tournaments not found for id: '+ id})
    }
    res.status(200).json(results)
  }catch(error){
    return res.status(500).json({error : error.message})
  }
})
//fn 12
async function fetchTournamentByGameId(gameId){
  let query = 'SELECT * FROM tournaments WHERE gameId =?';
  let response = await db.all(query, [gameId])
  return {tournaments : response}
}

//Exercise 12: Get Tournaments by Game ID
app.get('/tournaments/game/:gameId', async (req,res)=>{
  let gameId = req.params.gameId;
  try{
    let results = await fetchTournamentByGameId(gameId);
    if(results.tournaments.length === 0){
      return res.status(404).json({message : 'Tournaments not found for Game Id: '+ gameId})
    }
    res.status(200).json(results)
  }catch(error){
    return res.status(500).json({error : error.message})
  }
})

//Exercise 13: Get Tournaments Sorted by Prize Pool

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
