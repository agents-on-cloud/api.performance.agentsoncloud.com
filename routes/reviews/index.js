const express = require('express');
const router = express.Router();

const { getReviewedType } = require('../middlewares/dynamicHandler');
const { getGroupedReviews } = require('./controller');

router.param("reviewedType", getReviewedType); // makes sure model parameter gets checked
router.get(`/reviews/average/:reviewedType`, getGroupedReviews);

module.exports = router;
