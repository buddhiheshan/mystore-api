const ConflictException = require("../common/exceptions/ConflictException");
const { getItem, createItem } = require("../services/item.service");

const createItemHandler = async (req, res, next) => {
  try {
    //   Check if item exists
    let item = await getItem("name", req.body.name);

    if (item) throw new ConflictException("Item with same name already exists!");

    item = await createItem(req.body);

    res.status(201).json({
      message: "Item added succefully",
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createItemHandler };
