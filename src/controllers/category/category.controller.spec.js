const interceptor = require("../../../__mocks__/interceptor");
const ConflictException = require("../../common/exceptions/ConflictException");
const CategoryController = require("./category.controller");

const existingCategory = {
    id: 1,
    name: "existing category"
}

describe("Category Controller", () => {
    describe('postCatergoryHandler', () => {
        it("should fail if category exists", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                name: "mock category"
            }

            categoryService.getCategory.mockReturnValue(existingCategory);
            await categoryController.postCatergoryHandler()(req, res, next);
            expect(categoryService.getCategory.mock.calls.length).toBe(1);
            expect(categoryService.getCategory.mock.calls[0][0]).toBe("name");
            expect(categoryService.getCategory.mock.calls[0][1]).toBe(req.body.name);
            expect(categoryService.getCategory.mock.results[0].value).toBe(existingCategory);

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });

        it("should pass and bind created category to the response", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                name: "mock category"
            }

            categoryService.createCategory.mockReturnValue(req.body);
            await categoryController.postCatergoryHandler()(req, res, next);
            expect(categoryService.createCategory.mock.calls.length).toBe(1);
            expect(categoryService.createCategory.mock.calls[0][0]).toBe(req.body);
            expect(categoryService.createCategory.mock.results[0].value).toBe(req.body)

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(201)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(req.body)
        });
    });

    describe('getAllCatergoriesHandler', () => {

        it("should pass and bind  categories to the response", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            categoryService.createCategory.mockReturnValue(existingCategory);
            await categoryController.postCatergoryHandler()(req, res, next);
            expect(categoryService.createCategory.mock.calls.length).toBe(1);
            expect(categoryService.createCategory.mock.results[0].value).toBe(existingCategory)

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(201)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(existingCategory)
        });
    });

    describe('patchCategoryHandler', () => {

        it("should fail if id of the category to be patched does not exist", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                id: 2,
                name: "mock category"
            }

            categoryService.getCategory.mockReturnValueOnce();
            await categoryController.patchCategoryHandler()(req, res, next);
            expect(categoryService.getCategory.mock.calls.length).toBe(1);
            expect(categoryService.getCategory.mock.calls[0][0]).toBe("id");
            expect(categoryService.getCategory.mock.calls[0][1]).toBe(req.body.id);
            expect(categoryService.getCategory.mock.results[0].value).toBe()

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });
        it("should fail if a category exists with same category name", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                id: existingCategory.id,
                name: existingCategory.name
            }

            categoryService.getCategory.mockReturnValueOnce(existingCategory);
            categoryService.getCategory.mockReturnValueOnce(req.body);
            await categoryController.patchCategoryHandler()(req, res, next);
            expect(categoryService.getCategory.mock.calls.length).toBe(2);

            expect(categoryService.getCategory.mock.calls[0][0]).toBe("id");
            expect(categoryService.getCategory.mock.calls[0][1]).toBe(existingCategory.id);
            expect(categoryService.getCategory.mock.results[0].value).toBe(existingCategory)

            expect(categoryService.getCategory.mock.calls[1][0]).toBe("name");
            expect(categoryService.getCategory.mock.calls[1][1]).toBe(req.body.name);
            expect(categoryService.getCategory.mock.results[1].value.name).toBe(existingCategory.name)

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });
        it("should pass and bind  patched category to the response", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                id: existingCategory.id,
                name: "mock category"
            }

            categoryService.getCategory.mockReturnValueOnce(existingCategory).mockReturnValueOnce();
            categoryService.patchCategory.mockReturnValueOnce(req.body);
            await categoryController.patchCategoryHandler()(req, res, next);
            expect(categoryService.getCategory.mock.calls.length).toBe(2);

            expect(categoryService.getCategory.mock.calls[0][0]).toBe("id");
            expect(categoryService.getCategory.mock.calls[0][1]).toBe(req.body.id);
            expect(categoryService.getCategory.mock.results[0].value.id).toBe(req.body.id)

            expect(categoryService.getCategory.mock.calls[1][0]).toBe("name");
            expect(categoryService.getCategory.mock.calls[1][1]).toBe(req.body.name);
            expect(categoryService.getCategory.mock.results[1].value).toBe()

            expect(categoryService.patchCategory.mock.calls.length).toBe(1);
            expect(categoryService.patchCategory.mock.calls[0][0]).toBe(req.body);
            expect(categoryService.patchCategory.mock.results[0].value.name).toBe(req.body.name)

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(201)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(req.body)
        });
    });

    describe('deleteCategoryHandler', () => {

        it("should fail if id of the category to be deleted does not exist", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                id: 2,
                name: "mock category"
            }

            categoryService.getCategory.mockReturnValueOnce();
            await categoryController.deleteCategoryHandler()(req, res, next);
            expect(categoryService.getCategory.mock.calls.length).toBe(1);
            expect(categoryService.getCategory.mock.calls[0][0]).toBe("id");
            expect(categoryService.getCategory.mock.calls[0][1]).toBe(req.body.id);
            expect(categoryService.getCategory.mock.results[0].value).toBe()

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });
        it("should pass and delete category", async () => {
            const categoryController = new CategoryController();
            const categoryService = categoryController.categoryService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                id: existingCategory.id,
            }

            categoryService.getCategory.mockReturnValueOnce(existingCategory);
            categoryService.deleteCategory.mockReturnValueOnce();
            await categoryController.deleteCategoryHandler()(req, res, next);
            // expect(categoryService.getCategory.mock.calls.length).toBe(2);

            expect(categoryService.getCategory.mock.calls[0][0]).toBe("id");
            expect(categoryService.getCategory.mock.calls[0][1]).toBe(req.body.id);
            expect(categoryService.getCategory.mock.results[0].value.id).toBe(req.body.id)

            expect(categoryService.deleteCategory.mock.calls.length).toBe(1);
            expect(categoryService.deleteCategory.mock.calls[0][0]).toBe(req.body);
            expect(categoryService.deleteCategory.mock.results[0].value).toBe();

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(200)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
        });
    });
});