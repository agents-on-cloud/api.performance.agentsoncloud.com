const db = require("../models");
const moment = require("moment");
const { getValidMetrics } = require("./metrics");
const Op = db.Sequelize.Op

const getGroupedRecords = async (reviewedType, { orgId, id, reviewedId, limit = null, offset = null, daysBefore, orderBy, orderDesc }) => {
    const orderByArray = (orderBy && orderBy.split(",")) || [];
    const orderDescArray = (orderDesc && orderDesc.split(",")) || [];
    let validMetrics = await getValidMetrics(reviewedType, orgId);

    const attributes = [
        'id',
        "reviewedName",
        "reviewedType",
        [db.sequelize.fn('COUNT', db.sequelize.col('reviewedId')), 'number_of_reviews'],
        [db.sequelize.fn('AVG', db.sequelize.col('score')), 'score'],
        [db.sequelize.fn('AVG', db.sequelize.col('socialScore')), 'socialScore'],
        ...Object.keys(validMetrics).map(metric => [db.sequelize.fn('AVG', db.sequelize.col(`${metric}`)), `${metric}`])
    ];


    return await db.models.reviews.findAndCountAll({
        where: {
            reviewedType: {
                [Op.substring]: reviewedType
            },
            ...(id && { id }),
            ...(reviewedId && { reviewedId }),
            ...(daysBefore && {
                createdAt: {
                    [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                }
            })
        },
        attributes,
        limit,
        offset,
        group: 'reviewedId',
        ...(orderByArray.length && { order: [...orderByArray.map((order, idx) => [db.sequelize.fn('AVG', db.sequelize.col(`${order}`)), `${orderDescArray[idx] === "true" ? "DESC" : "ASC"}`])] })
    });
}

const createReviewRecord = async (body) => {
    return await db.reviews.create(body);
};

module.exports = { getGroupedRecords, createReviewRecord }
