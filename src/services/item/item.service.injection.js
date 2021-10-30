const env = require("../../configs");
const ItemService = require("./item.service");
const FakeItemService = require('./fake.item.service');

const getItemService = () => {
    return env.isTest ? new FakeItemService() : new ItemService()
}

module.exports = getItemService;