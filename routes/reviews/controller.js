const { getRecords, getGroupedRecords, getWorstRecords, createRecord } = require('../../services/reviews.js')

const getAllReviews = async (req, res) => {
    const { model, id } = req.params;
    const query = req.query;
    try {
        let reviews = await getRecords(model, id, query);

        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
};

const getModelReviews = async (req, res) => {
    const { model, id } = req.params;
    const query = req.query;
    try {
        const reviews = await getGroupedRecords(model, id, query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

const getWorstReviews = async (req, res) => {
    const { model } = req.params;
    const query = req.query;

    try {
        const reviews = await getWorstRecords(model, query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

module.exports = { getAllReviews, getModelReviews, getWorstReviews }