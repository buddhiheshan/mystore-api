class FakeItemService {
    getItem = jest.fn();
    createItem = jest.fn();
    getAllItems = jest.fn();
    getItemByID = jest.fn();
}

module.exports = FakeItemService;