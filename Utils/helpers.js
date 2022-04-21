const generateScores = (review, options) => {
    console.log(options);
    // let total = 0;
    // let count = 0;
    // const metricsArray = review.reviewedType !== 'providers' ? metrics[review.reviewedType] :
    //     metrics[review.reviewedType][review.providerType]

    // metricsArray.forEach(metric => {
    //     if (metric.base === 100 && review[metric.name]) {
    //         count++;
    //         total += review[metric.name];
    //     }
    // });

    return { score: 0, socialScore: 0 }
}

const defaultSort = (model) => {
    if (model.tableName === "reviews") return { order: [["score", "ASC"]] };

    return {};
}

module.exports = { generateScores, defaultSort };