const Item = require("../../models/item.model");
const Review = require("../../models/review.model");

class ReviewService {

  async postReview(itemId, data) {
    return await Item.relatedQuery("reviews").for(itemId).insert(data);
  };

  async getAllReviews(itemId) {
    return await Review.query().select("id", "description", "rating", "itemId").where("itemId", itemId).withGraphFetched("[customer]");
  };

}

module.exports = ReviewService;
