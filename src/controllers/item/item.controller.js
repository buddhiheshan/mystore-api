const ConflictException = require("../../common/exceptions/ConflictException");
const { getItem, createItem, getAllItems, getItemByID } = require("../../services/item/item.service");
const getItemService = require('../../services/item/item.service.injection');

class ItemController {
  constructor() {
    this.itemService = getItemService();
  };

  createItemHandler() {
    return async (req, res, next) => {
      try {
        //   Check if item exists
        let item = await this.itemService.getItem("name", req.body.name);

        if (item) throw new ConflictException("Item with same name already exists!");

        item = await this.itemService.createItem(req.body);

        res.status(201).json({
          message: "Item added succesfully",
          success: true,
          data: item,
        });
      } catch (error) {
        next(error);
      }
    };
  };

  getAllItemsHandler() {
    return async (req, res, next) => {
      try {
        const items = await this.itemService.getAllItems();
        res.status(200).json({
          message: "Items fetched successfully",
          success: true,
          data: items,
        });
      } catch (error) {
        next(error);
      }
    };
  };

  getItemHandler() {
    return async (req, res, next) => {
      try {
        //  !Check if id valid?
        const item = await this.itemService.getItemByID(req.params.itemId);

        res.status(200).json({
          message: "Items fetched successfully",
          success: true,
          data: item,
        });
      } catch (error) {
        next(error);
      }
    };
  };
};

module.exports = ItemController;