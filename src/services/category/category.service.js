const Category = require("../../models/category.model");

class CategoryService {
  async createCategory(data) {
    const category = await Category.query().insert(data);
    return category;
  };

  async getCategory(key, value) {
    const category = await Category.query().where(key, "=", value);
    if (!category.length) return null;
    return category;
  };

  async getAllCategories() {
    return await Category.query();
  };

  async patchCategory({ id, name }) {
    const category = await Category.query().patchAndFetchById(id, { name });
    return category;
  };

  async deleteCategory({ id }) {
    return await Category.query().deleteById(id);
  };
}

module.exports = CategoryService;
