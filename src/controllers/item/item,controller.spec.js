const ItemController = require("../item/item.controller");
const interceptor = require("../../../__mocks__/interceptor");
const ConflictException = require("../../common/exceptions/ConflictException");

const existingItem = {
    id: 1,
    name: "existing item"
}

describe("Item Controller", () => {
    describe('createItemHandler', () => {
        it("should fail if item exists", async () => {
            const itemController = new ItemController();
            const itemService = itemController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                name: "mock item"
            }
            req.params = {
                itemId: 1
            }

            itemService.getItem.mockReturnValue(existingItem);
            await itemController.createItemHandler()(req, res, next);
            expect(itemService.getItem.mock.calls.length).toBe(1);
            expect(itemService.getItem.mock.calls[0][0]).toBe("name");
            expect(itemService.getItem.mock.calls[0][1]).toBe(req.body.name);
            expect(itemService.getItem.mock.results[0].value).toBe(existingItem);

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });

        it("should pass and bind created item to the response", async () => {
            const itemController = new ItemController();
            const itemService = itemController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                name: "mock item"
            }

            itemService.createItem.mockReturnValue(req.body);
            await itemController.createItemHandler()(req, res, next);
            expect(itemService.createItem.mock.calls.length).toBe(1);
            expect(itemService.createItem.mock.calls[0][0]).toBe(req.body);
            expect(itemService.createItem.mock.results[0].value).toBe(req.body);

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(201)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(req.body)
        });
    });

    describe('getAllItemsHandler', () => {

        it("should pass and bind items to the response", async () => {
            const itemController = new ItemController();
            const itemService = itemController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            itemService.getAllItems.mockReturnValue(existingItem);
            await itemController.getAllItemsHandler()(req, res, next);
            expect(itemService.getAllItems.mock.calls.length).toBe(1);
            expect(itemService.getAllItems.mock.results[0].value).toBe(existingItem);

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(200)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(existingItem)
        });
    });

    describe('getItemHandler', () => {

        it("should pass and bind item to the response", async () => {
            const itemController = new ItemController();
            const itemService = itemController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            itemService.getItemByID.mockReturnValue(existingItem);
            await itemController.getItemHandler()(req, res, next);
            expect(itemService.getItemByID.mock.calls.length).toBe(1);
            expect(itemService.getItemByID.mock.results[0].value).toBe(existingItem);

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(200)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(existingItem)
        });
    });
});