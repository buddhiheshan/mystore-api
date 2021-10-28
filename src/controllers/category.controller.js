const ConflictException = require("../common/exceptions/ConflictException");
const { createCategory, getCategory, getAllCategories, patchCategory, deleteCategory } = require("../services/category.service");

const postCatergoryHandler = async (req, res, next) => {
  try {
    //   Check if category already exist
    if (await getCategory("name", req.body.name)) throw new ConflictException("Category already exist!");

    // Create new category
    const category = await createCategory(req.body);

    res.status(201).json({
      message: "Category created successfully.",
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCatergoriesHandler = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    // ! count as metadata?
    res.status(200).json({
      message: "Categories fetched succefully",
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const patchCategoryHandler = async (req, res, next) => {
  try {
    //   Check if category already exist
    // !Statuscode?
    if (!(await getCategory("id", req.body.id))) throw new ConflictException("Category does not exist!");
    if (await getCategory("name", req.body.name)) throw new ConflictException("Category already exist!");

    // Patch category
    const category = await patchCategory(req.body);

    res.status(201).json({
      message: "Categories patched succefully",
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryHandler = async (req, res, next) => {
  try {
    // !Statuscode?
    if (!(await getCategory("id", req.body.id))) throw new ConflictException("Category does not exist!");

    await deleteCategory(req.body);

    res.status(200).json({
      message: "Category deleted succefully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCatergoryHandler,
  getAllCatergoriesHandler,
  patchCategoryHandler,
  deleteCategoryHandler,
};
