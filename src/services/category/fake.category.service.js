class FakeCategoryService {
    getCategory = jest.fn();
    createCategory = jest.fn();
    getAllCategories = jest.fn();
    patchCategory = jest.fn();
    deleteCategory = jest.fn();
}

module.exports = FakeCategoryService;