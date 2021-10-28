const express = require("express");
const { postCatergoryHandler, getAllCatergoriesHandler, patchCategoryHandler, deleteCategoryHandler } = require("../controllers/category.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { postCategory, patchCategory, deleteCategory } = require("../validation/caregory.schema");

const CategoryRouter = express.Router();

CategoryRouter.post("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(postCategory), postCatergoryHandler);

CategoryRouter.get("/", getAllCatergoriesHandler);

CategoryRouter.patch("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(patchCategory), patchCategoryHandler);

CategoryRouter.delete("/", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(deleteCategory), deleteCategoryHandler);

// CategoryRouter.get("/:CategoryID")

module.exports = CategoryRouter;
