const express = require('express');
const router = express.Router();

const getModel = require('../middlewares/dynamicHandler');
const { getAllReviews, getModelReviews } = require('./controller');

router.param("model", getModel); // makes sure model param gets checked
router.get('/reviews/:model?', getAllReviews);
router.get(`/reviews/average/:model`, getModelReviews);

module.exports = router;
