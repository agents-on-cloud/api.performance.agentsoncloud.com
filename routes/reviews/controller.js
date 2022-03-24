const { getRecords, getGroupedRecords, createRecord } = require('../../services/reviews.js')

const getAllReviews = async (req, res) => {
    const { model } = req.params;
    const query = req.query;
    try {
        let reviews = await getRecords(model, query);

        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
};

const getModelReviews = async (req, res) => {
    const { model } = req.params;
    const query = req.query;
    try {
        const reviews = await getGroupedRecords(model, query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

module.exports = { getAllReviews, getModelReviews }