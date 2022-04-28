const { getGroupedRecords } = require('../../services/reviews.js')

const getGroupedReviews = async (req, res) => {
    const { query, reviewedType } = req;
    try {
        const reviews = await getGroupedRecords(reviewedType, query);
        return res.status(200).send(reviews);
    } catch (error) {
        res.status(501).send(error.toString());
    }
}

module.exports = { getGroupedReviews }