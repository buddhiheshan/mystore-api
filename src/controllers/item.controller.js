const ConflictException = require("../common/exceptions/ConflictException");
const { getItem, createItem, getAllItems, getItemByID } = require("../services/item.service");

const createItemHandler = async (req, res, next) => {
  try {
    //   Check if item exists
    let item = await getItem("name", req.body.name);

    if (item) throw new ConflictException("Item with same name already exists!");

    item = await createItem(req.body);

    res.status(201).json({
      message: "Item added succesfully",
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const getAllItemsHandler = async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.status(200).json({
      message: "Items fetched successfully",
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

const getItemHandler = async (req, res, next) => {
  try {
    //  !Check if id valid?
    const item = await getItemByID(req.params.itemId);

    res.status(200).json({
      message: "Items fetched successfully",
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createItemHandler,
  getAllItemsHandler,
  getItemHandler,
};
