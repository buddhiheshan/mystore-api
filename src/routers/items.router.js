const express = require("express");
const { createItemHandler, getAllItemsHandler } = require("../controllers/item.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { postItem } = require("../validation/item.schema");

const ItemsRouter = express.Router();

ItemsRouter.post("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(postItem), createItemHandler);

ItemsRouter.get("/", getAllItemsHandler);

module.exports = ItemsRouter;
