const express = require("express");
const { createItemHandler, getAllItemsHandler, getItemHandler } = require("../controllers/item.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { postItem } = require("../validation/item.schema");
const { postReviewHandler } = require("../controllers/review.controller");

const ItemsRouter = express.Router();

//  / Routes
ItemsRouter.post("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(postItem), createItemHandler);

ItemsRouter.get("/", getAllItemsHandler);

// /:itemId Routes
ItemsRouter.get("/:itemId", getItemHandler);

// !TODO: /:itemId PATCH and DELETE

ItemsRouter.post("/:itemId/reviews", AuthenticationMiddleware, AuthorizathionMiddleware(["customer"]), postReviewHandler);

module.exports = ItemsRouter;
