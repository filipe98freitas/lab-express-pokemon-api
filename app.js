const express = require("express");
const { re } = require("semver");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
app.use(express.json());

app.get("/", function (req, res) {
  res.send(allPokemon);
});

app.get("/pokemon", (req, res) => {
  if (req.query.search) {
    const searchResult = allPokemon.filter((pokemonObj) => {
      for (let key in pokemonObj) {
        const includesResult = String(pokemonObj[key])
          .toLowerCase()
          .includes(req.query.search.toLocaleLowerCase());
        if (includesResult) {
          return includesResult;
        }
      }
    });
    if (searchResult.length) {
      return res.status(200).json(searchResult);
    }
    return res.status(404).json({ msg: "Pokemon not found." });
  }
});

app.get("/pokemon/:id", (req, res) => {
  const foundPokemon = allPokemon.find((pokemon) => {
    return String(pokemon.id) === req.params.id;
  });

  if (foundPokemon) {
    return res.status(200).json(foundPokemon);
  }

  return res.status(404).json({ msg: "Pokemon not found." });
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
