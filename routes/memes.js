var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const configPath = path.resolve(__dirname, "../config.json");
const configData = fs.readFileSync(configPath);
const config = JSON.parse(configData);
const apiUrl = config.apiUrl;

let memeData = null;

function fetchAndSaveData() {
  axios.get(apiUrl).then((response) => {
    const jsonData = response.data.memes;

    if (!memeData) {
      fs.writeFileSync(
        path.resolve(__dirname, "../data/memes.json"),
        JSON.stringify(jsonData, null, 2)
      );
      console.log("JSON data is saved to memes.json");
      memeData = jsonData;
    }
  });
}
fetchAndSaveData();

router.get("/", function (req, res, next) {
  try {
    let memeData = fs.readFileSync(
      path.resolve(__dirname, "../data/memes.json")
    );
    const searchTerm = req.query.search || "";

    const filteredMemes = memeData
      ? JSON.parse(memeData).filter((meme) =>
          meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    res.render("memes", { memes: filteredMemes, searchTerm, user: req.user });
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
});

module.exports = router;
