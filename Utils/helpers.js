const metrics = require('../../metrics.json');

const generateReviewScore = (review) => {
    let total = 0;
    let count = 0;
    const metricsArray = review.reviewedType !== 'providers' ? metrics[review.reviewedType] :
        metrics[review.reviewedType][review.providerType]

    metricsArray.forEach(metric => {
        if (metric.base === 100 && review[metric.name]) {
            count++;
            total += review[metric.name];
        }
    });

    return parseInt(total / count);
}

module.exports = { generateReviewScore };