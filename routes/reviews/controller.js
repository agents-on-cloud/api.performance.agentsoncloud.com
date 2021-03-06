const { getGroupedRecords, getMovingRecords, getNormalRecords, getDistinctRecords } = require('../../services/reviews.js')

const getGroupedReviews = async (req, res) => {
    const { query, reviewedType } = req;
    try {
        const reviews = await getGroupedRecords(reviewedType, query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

const getMovingScores = async (req, res) => {
    const { query } = req;

    try {
        const reviews = await getMovingRecords(query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

const getNormalScores = async (req, res) => {
    const { query, reviewedType } = req;

    try {
        const reviews = await getNormalRecords(reviewedType, query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

const getDistinctValues = async (req, res) => {
    const { params: { attribute }, reviewedType } = req;

    try {
        const values = await getDistinctRecords(reviewedType, attribute);
        return res.status(200).send(values);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

module.exports = { getGroupedReviews, getMovingScores, getNormalScores, getDistinctValues }