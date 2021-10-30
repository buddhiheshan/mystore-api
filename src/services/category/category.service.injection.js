const env = require("../../configs")
const CatergoryService = require("./category.service")
const FakeCategoryService = require("./fake.category.service")

const getCategoryService = () => {
    return env.isTest ? new FakeCategoryService() : new CatergoryService();
}

module.exports = getCategoryService;