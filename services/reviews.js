const db = require("../models");
const metrics = require("../../metrics.json")
const moment = require("moment");
const Op = db.Sequelize.Op

const getRecords = async (model, id, { limit = null, offset = null, daysBefore }) => {
    if (id) return await db.reviews.findOne({
        where: {
            ...(model && { reviewedType: model }),
            ...(id && { reviewedId: id })
        },
    });
    console.log({ offset });
    return await db.reviews.findAndCountAll({
        where: {
            ...(model && {
                reviewedType: model,
            }),
            ...(daysBefore && {
                createdAt: {
                    [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                }
            })
        },
        limit,
        offset,
        order: db.sequelize.literal("score ASC"),
    });
}

const getGroupedRecords = async (model, id, { limit = null, offset = null, daysBefore }) => {
    let validMetrics = getValidMetrics(model);
    const attributes = [
        "reviewedName",
        [db.sequelize.fn('COUNT', db.sequelize.col('reviewedId')), 'number_of_reviews'],
        [db.sequelize.fn('AVG', db.sequelize.col('score')), 'avg_score'],
        ...validMetrics.map(metric => [db.sequelize.fn('AVG', db.sequelize.col(`${metric.name}`)), `avg_${metric.name}`])
    ];

    if (model === "providers") attributes.push("providerType");

    return await db.reviews.findAll({
        where: {
            reviewedType: model,
            ...(id && { reviewedId: id }),
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
        order: db.sequelize.literal("avg_score ASC"),
    });
}

const getWorstRecords = async (model, { limit = 5, offset = null, daysBefore }) => {
    let validMetrics = getValidMetrics(model);

    return await db.reviews.findAll({
        offset,
        limit,
        order: db.sequelize.literal("avg_score ASC"),
        ...(model && {
            attributes: [
                "reviewerName", "reviewedName", "createdAt",
                [db.sequelize.fn('AVG', db.sequelize.col('score')), 'avg_score'],
                ...validMetrics.map(metric => metric.name)
            ],
            where: {
                reviewedType: model,
                ...(daysBefore && {
                    createdAt: {
                        [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                    }
                })
            }
        }),
    });
}

const getValidMetrics = (model) => {
    if (model !== "providers") {
        return metrics[model];
    } else if (model === "providers") {
        return [...metrics[model]["operational"], ...metrics[model]["managerial"], ...metrics[model]["front-facing"]];
    }
}

const createRecord = async (model, body) => {
    return await db[model].create(body);
};

module.exports = { getRecords, createRecord, getGroupedRecords, getWorstRecords }
