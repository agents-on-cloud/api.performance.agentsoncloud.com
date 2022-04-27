const db = require("../models");
const { findApplicableKey } = require("../Utils/helpers");

const getValidMetrics = async (reviewedType, orgId = -1) => {
    const metrics = (await db.models.metrics.findOne({ where: { orgId } })).get({ plain: true });
    if (reviewedType === "reviews") return metrics;

    let validMetrics = {};
    Object.keys(metrics).forEach(key => {
        const aKey = findApplicableKey(metrics[key], reviewedType)

        if (aKey) {
            validMetrics[key] = metrics[key][aKey];
            validMetrics[key].isSocial = metrics[key].isSocial || false;
        }
    })
    return validMetrics;
}

module.exports = { getValidMetrics }
