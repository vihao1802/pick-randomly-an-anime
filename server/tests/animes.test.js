import { getAnime } from "../src/controllers/animes.js";

describe("getAnime", () => {
  test("return to be defined", () => {
    expect(getAnime).toBeDefined();
  });
  test("Have property url", () => {
    expect(getAnime).toHaveProperty("url");
  });
});
