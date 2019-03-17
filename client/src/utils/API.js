

import axios from "axios";

export default {
  // Gets all books
  getGames: function() {
    return axios.get("/api/games");
  },
  getFutureGames: function() {
    return axios.get("/api/games/future");
  },
  // Gets the game with the given id
  getGame: function(id) {
    return axios.get("/api/games/" + id);
  },
  // Deletes the game with the given id
  deleteGame: function(id) {
    return axios.delete("/api/games/" + id);
  },
  // Saves a game to the database
  saveGame: function(gameData) {
    return axios.post("/api/games", gameData);
  },
  updateGame: function(id, gameData) {
    return axios.put("/api/games/"+id, gameData)
  }
};
