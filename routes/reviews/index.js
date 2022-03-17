const express = require('express');
const router = express.Router();

const getModel = require('../middlewares/dynamicHandler');
const { getAllReviews, getModelReviews, getWorstReviews } = require('./controller');

router.param("model", getModel); // makes sure model param gets checked
router.get('/reviews', getAllReviews);
router.get(`/reviews/average/:model/:id?`, getModelReviews);
router.get(`/reviews/worst/:model?`, getWorstReviews);

module.exports = router;
