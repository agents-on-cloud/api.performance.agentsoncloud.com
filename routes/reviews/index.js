const express = require('express');
const router = express.Router();

const getModel = require('../middlewares/dynamicHandler');
const { getAllReviews, getModelReviews } = require('./controller');

router.param("model", getModel); // makes sure model param gets checked
router.get('/reviews', getAllReviews);
router.get(`/reviews/:model/:id?`, getModelReviews);

module.exports = router;
