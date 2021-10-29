const Item = require("../models/item.model");

const postReview = async (itemId, data) => {
  return await Item.relatedQuery("reviews").for(itemId).insert(data);
};

module.exports = {
  postReview,
};
