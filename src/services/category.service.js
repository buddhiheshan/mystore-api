const Category = require("../models/category.model");

const createCategory = async (data) => {
  const category = await Category.query().insert(data);
  return category;
};

const getCategory = async (key, value) => {
  const category = await Category.query().where(key, "=", value);
  if (!category.length) return null;
  return category;
};

const getAllCategories = async () => {
  return await Category.query();
};

const patchCategory = async ({ id, name }) => {
  const category = await Category.query().patchAndFetchById(id, { name });
  return category;
};

const deleteCategory = async ({ id }) => {
  return await Category.query().deleteById(id);
};

module.exports = {
  createCategory,
  getCategory,
  getAllCategories,
  patchCategory,
  deleteCategory,
};
