const express = require("express");
const {
  ValidationMiddleware,
} = require("../middlewares/validation/validation.middleware");
const { postItem } = require("../validation/item.schema");
const { postReview } = require("../validation/review.schema");
const AuthMiddleware = require("../middlewares/auth/auth.middleware");
const ItemController = require("../controllers/item/item.controller");
const ReviewController = require("../controllers/review/review.controller");

const ItemsRouter = express.Router();
const authMiddleware = new AuthMiddleware();
const itemController = new ItemController();
const reviewController = new ReviewController();

//  / Routes
ItemsRouter.post(
  "/",
  authMiddleware.AuthenticationMiddleware(),
  authMiddleware.AuthorizationMiddleware(["owner"]),
  ValidationMiddleware(postItem),
  itemController.createItemHandler()
);

ItemsRouter.get(
  "/",
  itemController.getAllItemsHandler()
);

// /:itemId Routes
ItemsRouter.get(
  "/:itemId",
  itemController.getItemHandler()
);

// !TODO: /:itemId PATCH and DELETE

// !TODO: Allow review placing only after order purchased
ItemsRouter.post(
  "/:itemId/reviews",
  authMiddleware.AuthenticationMiddleware(),
  authMiddleware.AuthorizationMiddleware(["customer"]),
  ValidationMiddleware(postReview),
  reviewController.postReviewHandler()
);

ItemsRouter.get(
  "/:itemId/reviews",
  reviewController.getAllReviewsHandler()
);

// !TODO: /:itemId/review/ PATCH and DELETE

module.exports = ItemsRouter;
