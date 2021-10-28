const express = require("express");
const { createItemHandler } = require("../controllers/item.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { postItem } = require("../validation/item.schema");

const ItemsRouter = express.Router();

ItemsRouter.post("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(postItem), createItemHandler);

module.exports = ItemsRouter;
