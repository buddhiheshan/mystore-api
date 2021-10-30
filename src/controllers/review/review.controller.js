const ConflictException = require("../../common/exceptions/ConflictException");
const getReviewService = require("../../services/review/review.service.injection");
const getItemService = require("../../services/item/item.service.injection");

class ReviewController {
  constructor() {
    this.reviewService = getReviewService();
    this.itemService = getItemService();
  };

  postReviewHandler() {
    return async (req, res, next) => {
      try {
        // Check if itemId is valid
        const item = await this.itemService.getItemByID(req.params.itemId);
        if (!item) throw new ConflictException("Item does not exist!");

        // Add the review
        const review = await this.reviewService.postReview(+req.params.itemId, req.user.user_id, req.body);

        res.status(201).json({
          message: "Review added successfully",
          success: true,
          data: review,
        });
      } catch (error) {
        next(error);
      };
    };
  };

  getAllReviewsHandler() {
    return async (req, res, next) => {
      try {
        const item = await this.itemService.getItemByID(req.params.itemId);
        if (!item) throw new ConflictException("Item does not exist!");

        const reviews = await this.reviewService.getAllReviews(req.params.itemId);
        res.status(200).json({
          message: "Reviews fetched successfully",
          success: true,
          data: reviews,
        });
      } catch (error) {
        next(error);
      };
    };
  };
}



module.exports = ReviewController;
