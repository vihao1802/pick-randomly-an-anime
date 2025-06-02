import { base_url } from "./instance";

const prefix = `${base_url}/animes`;

const animeApis = {
  getOneRandomAnime: () => `${prefix}/get-one-random-anime`,
  saveAnime: () => `${prefix}/save`,
  unsavedAnime: () => `${prefix}/unsaved`,
  getAllSavedAnimes: () => `${prefix}/get-all-saved-animes`,
  searchAnimes: () => `${prefix}/search`,
};

export default animeApis;
