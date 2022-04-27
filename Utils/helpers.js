
// Min max help get value as percentage of between, relative_value = absolute_value-min/(max-min)
// Average total score is each sum(relative_value * weight)/sum(weights)
// Average behavioral score is each sum_behavioral( relative_value * weight)/sum(weights) 
const calculateScores = (reviewMetrics, validMetrics) => {
    let total = 0, totalWeight = 0, totalBehavioral = 0, totalBehavioralWeight = 0;

    Object.keys(reviewMetrics).forEach((key) => {
        const { max, min, weight, isSocial } = validMetrics[key];
        let relativeValue = (reviewMetrics[key] - min) / (max - min);

        total += relativeValue * weight;
        totalWeight += weight;

        if (isSocial) {
            totalBehavioral += relativeValue * weight;
            totalBehavioralWeight += weight;
        }
    })

    const score = (total / totalWeight).toFixed(2)
    const socialScore = totalBehavioral > 0 ? (totalBehavioral / totalBehavioralWeight).toFixed(2) : null;

    return { score, socialScore }
}

const randomizeMetrics = ({ ...metrics }) => {
    Object.keys(metrics).forEach(key => {
        metrics[key] = (Math.random() * metrics[key].max).toFixed(2);
    })

    return metrics;
}

const defaultSort = (model) => {
    if (model.tableName === "reviews") return { order: [["score", "ASC"]] };

    return {};
}

// mini helper to forgo the need to specify parent entity 'providers' when trying to find if metric is applicable
const findApplicableKey = (obj, string) => Object.keys(obj).find(a => ~a.indexOf(string))

module.exports = { randomizeMetrics, calculateScores, defaultSort, findApplicableKey };