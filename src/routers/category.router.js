const express = require("express");
const CategoryController = require("../controllers/category/category.controller");
const AuthMiddleware = require("../middlewares/auth/auth.middleware");
const {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
} = require("../middlewares/auth/auth.middleware");
const {
  ValidationMiddleware,
} = require("../middlewares/validation/validation.middleware");
const {
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../validation/caregory.schema");

const CategoryRouter = express.Router();
const categoryController = new CategoryController();
const authMiddleware = new AuthMiddleware();

CategoryRouter.post(
  "/",
  authMiddleware.AuthenticationMiddleware(),
  authMiddleware.AuthorizationMiddleware(["owner"]),
  ValidationMiddleware(postCategory),
  categoryController.postCatergoryHandler()
);

CategoryRouter.get(
  "/",
  categoryController.getAllCatergoriesHandler()
);

CategoryRouter.patch(
  "/",
  authMiddleware.AuthenticationMiddleware(),
  authMiddleware.AuthorizationMiddleware(["owner"]),
  ValidationMiddleware(patchCategory),
  categoryController.patchCategoryHandler()
);

CategoryRouter.delete(
  "/",
  authMiddleware.AuthenticationMiddleware(),
  authMiddleware.AuthorizationMiddleware(["owner"]),
  ValidationMiddleware(deleteCategory),
  categoryController.deleteCategoryHandler()
);

// CategoryRouter.get("/:categoryID");

module.exports = CategoryRouter;
