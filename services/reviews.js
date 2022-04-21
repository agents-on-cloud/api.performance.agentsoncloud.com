const db = require("../models");
// TODO: Remove Dependency
// const metrics = require("../metrics.json")
const moment = require("moment");
const Op = db.Sequelize.Op

const getGroupedRecords = async (reviewedType, { id, limit = null, offset = null, daysBefore, orderBy, orderDesc }) => {
    let validMetrics = getValidMetrics(reviewedType);
    const orderByArray = (orderBy && orderBy.split(",")) || [];
    const orderDescArray = (orderDesc && orderDesc.split(",")) || [];
    const attributes = [
        'id',
        "reviewedName",
        [db.sequelize.fn('COUNT', db.sequelize.col('reviewedId')), 'number_of_reviews'],
        [db.sequelize.fn('AVG', db.sequelize.col('score')), 'score'],
        ...validMetrics.map(metric => [db.sequelize.fn('AVG', db.sequelize.col(`${metric.name}`)), `${metric.name}`])
    ];

    if (reviewedType === "providers") attributes.push("providerType");
    return await db.models.reviews.findAndCountAll({
        where: {
            reviewedType,
            ...(id && { reviewedName: id }),
            ...(daysBefore && {
                createdAt: {
                    [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                }
            })
        },
        limit,
        offset,
        attributes,
        group: 'reviewedId',
        ...(orderByArray.length ? { order: [...orderByArray.map((order, idx) => [db.sequelize.fn('AVG', db.sequelize.col(`${order}`)), `${orderDescArray[idx] === "true" ? "DESC" : "ASC"}`])] } : { order: [[db.sequelize.fn('AVG', db.sequelize.col('score')), "ASC"]] })
    });
}

const getValidMetrics = (reviewedType) => {
    if (reviewedType !== "providers") {
        return metrics[reviewedType];
    } else if (reviewedType === "providers") {
        return [...metrics[reviewedType]["operational"], ...metrics[reviewedType]["managerial"], ...metrics[reviewedType]["front-facing"]];
    }
}

const createReviewRecord = async (body) => {
    return await db.reviews.create(body);
};

module.exports = { getGroupedRecords, createReviewRecord }
