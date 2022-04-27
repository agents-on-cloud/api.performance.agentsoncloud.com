const express = require('express');
const router = express.Router();

const { getReviewedType } = require('../middlewares/dynamicHandler');
const { getMetrics } = require('./controller');

router.param("reviewedType", getReviewedType); // makes sure model parameter gets checked
router.get(`/metrics/required/:reviewedType`, getMetrics);

module.exports = router;
