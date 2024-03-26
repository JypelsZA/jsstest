const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();

router.get("/:id", ensureLoggedIn, function (req, res, next) {
  const memeId = req.params.id;
  const isAuthenticated = req.isAuthenticated();

  const memeData = fs.readFileSync(
    path.resolve(__dirname, "../data/memes.json")
  );
  const memes = JSON.parse(memeData);

  const meme = memes.find((m) => m.id == memeId);

  if (meme) {
    res.render("details", { meme, isAuthenticated, user: req.user });
  } else {
    res.status(404).send("Meme not found");
  }
});

module.exports = router;
