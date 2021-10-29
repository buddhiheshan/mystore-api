const ConflictException = require("../common/exceptions/ConflictException");
const { getUser } = require("../services/auth.service");
const { postReview, getAllReviews } = require("../services/review.service");
const { getItemByID } = require("../services/item.service");

const postReviewHandler = async (req, res, next) => {
  try {
    // Check if the customerId is valid
    const user = await getUser("id", req.body.customerId);
    if (!user) throw new ConflictException("Customer does not exist!")();
    if (user.id !== req.user.user_id) throw new ConflictException("Cannot add review for another user!");

    // Check if itemId is valid

    const item = await getItemByID(req.params.itemId);
    if (!item) throw new ConflictException("Item does not exist!");

    // Add the review
    const review = await postReview(req.params.itemId, req.body);

    res.status(201).json({
      message: "Review added successfully",
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const getAllReviewsHandler = async (req, res, next) => {
  try {
    const item = await getItemByID(req.params.itemId);
    if (!item) throw new ConflictException("Item does not exist!");

    const reviews = await getAllReviews(req.params.itemId);
    res.status(200).json({
      message: "Reviews fetched successfully",
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postReviewHandler,
  getAllReviewsHandler,
};
