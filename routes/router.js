const express = require("express");
const dynamicRouter = require("./dynamic");
const reviewsRouter = require("./reviews");
const metricsRouter = require("./metrics");

const router = express.Router();
router.use([dynamicRouter, reviewsRouter, metricsRouter]);

module.exports = router;
