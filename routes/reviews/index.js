const express = require('express');
const router = express.Router();

const { getReviewedType } = require('../middlewares/dynamicHandler');
const { getGroupedReviews, getMovingScores, getNormalScores, getDistinctValues } = require('./controller');

router.param("reviewedType", getReviewedType); // makes sure model parameter gets checked
router.get(`/reviews/average/:reviewedType`, getGroupedReviews);
router.get(`/reviews/moving/scores/:reviewedType`, getMovingScores);
router.get(`/reviews/normal/scores/:reviewedType`, getNormalScores);
router.get(`/reviews/distinct/:reviewedType/:attribute`, getDistinctValues);

module.exports = router;
