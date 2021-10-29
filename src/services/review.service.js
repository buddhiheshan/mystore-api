const Item = require("../models/item.model");
const Review = require("../models/review.model");

const postReview = async (itemId, data) => {
  return await Item.relatedQuery("reviews").for(itemId).insert(data);
};

const getAllReviews = async (itemId) => {
  console.log(itemId);
  return await Review.query().select("id", "description", "rating", "itemId").where("itemId", itemId).withGraphFetched("[customer]");
};

module.exports = {
  postReview,
  getAllReviews,
};
