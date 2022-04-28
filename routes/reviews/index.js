const express = require('express');
const router = express.Router();

const { getReviewedType } = require('../middlewares/dynamicHandler');
const { getGroupedReviews, getMovingScores, getNormalScores } = require('./controller');

router.param("reviewedType", getReviewedType); // makes sure model parameter gets checked
router.get(`/reviews/average/:reviewedType`, getGroupedReviews);
router.get(`/reviews/moving/scores/:reviewedType`, getMovingScores);
router.get(`/reviews/normal/scores/:reviewedType`, getNormalScores);

module.exports = router;
