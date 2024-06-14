import animes from "../data/animes.json" assert { type: "json" };

const getAnime = (req, res) => {
  let randomNumber = Math.floor(Math.random() * animes.length) + 1; // random from 1 to length
  let anime = animes.find((item) => item.id === randomNumber);
  res.json(anime);
  return anime;
};

export { getAnime };
