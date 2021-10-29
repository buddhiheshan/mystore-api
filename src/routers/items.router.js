const express = require("express");
const { createItemHandler, getAllItemsHandler, getItemHandler } = require("../controllers/item.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { postItem } = require("../validation/item.schema");
const { postReviewHandler, getAllReviewsHandler } = require("../controllers/review.controller");
const { postReview } = require("../validation/review.schema");

const ItemsRouter = express.Router();

//  / Routes
ItemsRouter.post("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(postItem), createItemHandler);

ItemsRouter.get("/", getAllItemsHandler);

// /:itemId Routes
ItemsRouter.get("/:itemId", getItemHandler);

// !TODO: /:itemId PATCH and DELETE

// !TODO: Allow review placing only after order purchased
ItemsRouter.post("/:itemId/reviews", AuthenticationMiddleware, AuthorizathionMiddleware(["customer"]), ValidationMiddleware(postReview), postReviewHandler);

ItemsRouter.get("/:itemId/reviews", getAllReviewsHandler);

// !TODO: /:itemId/review/ PATCH and DELETE

module.exports = ItemsRouter;
