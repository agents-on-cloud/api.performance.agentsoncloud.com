var express = require("express");
var dynamicRouter = require("./dynamic");
var reviewsRouter = require("./reviews");

const router = express.Router();
router.use([dynamicRouter, reviewsRouter]);

module.exports = router;
