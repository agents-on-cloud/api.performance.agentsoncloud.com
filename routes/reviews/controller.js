const { getRecords, createRecord } = require('../../services/reviews.js')

const getAllReviews = async (req, res) => {

    try {
        const reviews = await getRecords();
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
};

const getModelReviews = async (req, res) => {
    const { model, id } = req.params;
    const reviews = await getRecords(model, id)
    try {

        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

module.exports = { getAllReviews, getModelReviews }