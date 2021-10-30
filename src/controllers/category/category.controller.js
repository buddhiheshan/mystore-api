const ConflictException = require("../../common/exceptions/ConflictException");
const getCategoryService = require('../../services/category/category.service.injection');


class CategoryController {
  constructor() {
    this.categoryService = getCategoryService();
  }

  postCatergoryHandler() {
    return async (req, res, next) => {
      try {
        //   Check if category already exist
        if (await this.categoryService.getCategory("name", req.body.name)) throw new ConflictException("Category already exist!");

        // Create new category
        const category = await this.categoryService.createCategory(req.body);

        res.status(201).json({
          message: "Category created successfully.",
          success: true,
          data: category,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  getAllCatergoriesHandler() {
    return async (req, res, next) => {
      try {
        const categories = await this.categoryService.getAllCategories();
        res.status(200).json({
          message: "Categories fetched succefully",
          success: true,
          data: categories,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  patchCategoryHandler() {
    return async (req, res, next) => {
      try {
        //   Check if category already exist
        if (!(await this.categoryService.getCategory("id", req.body.id))) throw new ConflictException("Category does not exist!");
        if (await this.categoryService.getCategory("name", req.body.name)) throw new ConflictException("Category already exist!");

        // Patch category
        const category = await this.categoryService.patchCategory(req.body);

        res.status(201).json({
          message: "Categories patched succefully",
          success: true,
          data: category,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  deleteCategoryHandler() {
    return async (req, res, next) => {
      try {
        // !TODO : Change exception
        if (!(await this.categoryService.getCategory("id", req.body.id))) throw new ConflictException("Category does not exist!");

        await this.categoryService.deleteCategory(req.body);

        res.status(200).json({
          message: "Category deleted succefully",
          success: true,
        });
      } catch (error) {
        next(error);
      }
    };
  }
}



module.exports = CategoryController;
