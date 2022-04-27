const { getValidMetrics } = require("../../services/metrics");

const getMetrics = async (req, res) => {
    const { query, reviewedType } = req;

    try {
        const metrics = await getValidMetrics(reviewedType, query.orgId);
        return res.status(200).send(metrics);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

module.exports = { getMetrics }