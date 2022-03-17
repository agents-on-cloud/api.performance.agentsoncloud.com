var express = require("express");
var reviewRoutes = require("./reviews");

const router = express.Router();
router.use(reviewRoutes);

module.exports = router;
