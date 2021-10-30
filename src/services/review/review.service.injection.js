const env = require("../../configs")
const FakeReviewService = require("./fake.review.service")
const ReviewService = require("./review.service")

const getReviewService = () => {
    return env.isTest ? new FakeReviewService() : new ReviewService();
}

module.exports = getReviewService;