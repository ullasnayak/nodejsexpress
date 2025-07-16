const express = require("express");
const router = express.Router();

const moviesDB = {
  comedy: [
    { id: 1, title: "The Hangover", year: 2009 },
    { id: 2, title: "Superbad", year: 2007 },
  ],
  horror: [
    { id: 1, title: "The Conjuring", year: 2013 },
    { id: 2, title: "Hereditary", year: 2018 },
  ],
  action: [
    { id: 1, title: "John Wick", year: 2014 },
    { id: 2, title: "Mad Max: Fury Road", year: 2015 },
  ],
};

router.get("/movies/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase();
  console.log("Route hit with genre:", req.params.genre);
  const matchingGenre = Object.keys(moviesDB).find(
    (key) => key.toLowerCase() === genre
  );

  if (matchingGenre) {
    return res.json({
      genre: matchingGenre,
      movies: moviesDB[matchingGenre],
      timestamp: new Date().toISOString(),
    });
  }

  res.status(404).json({
    error:
      "Genre not found. Available genres: " + Object.keys(moviesDB).join(", "),
  });
});

module.exports = router;
