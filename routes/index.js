var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const isAuthenticated = req.isAuthenticated();

  res.render("index", { isAuthenticated, user: req.user });
});

module.exports = router;
