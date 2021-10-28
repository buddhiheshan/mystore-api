const Category = require("../models/category.model");
const ItemSKUVariant = require("../models/item-sku-variant.model");
const Item = require("../models/item.model");
const SKU = require("../models/sku.model");
const Variant = require("../models/vaiant.model");

const getItem = async (key, value) => {
  const item = await Item.query().where(key, "=", value).first();
  return item;
};

const createItem = async (data) => {
  const item = await Category.relatedQuery("items").for(data.category).insert({ name: data.name });

  data.skus.forEach(async (sku) => {
    const newsku = await SKU.query().insert({
      price: sku.price,
      quantity: sku.quantity,
      discount: sku.discount,
    });
    Object.keys(sku.features).map(async (key) => {
      let feature = await Variant.query().insert({ name: key }).onConflict("name").ignore();
      if (feature.id === 0) {
        feature = await Variant.query().where("name", "=", key).first();
      }
      const itemSKUVarient = await ItemSKUVariant.query().insert({ value: sku.features[key], itemId: item.id, skuId: newsku.id, variantId: feature.id });
      // console.log(itemSKUVarient);
    });
  });

  const response = await item.$fetchGraph("skus");
  console.log(response);
  return;
};

module.exports = {
  getItem,
  createItem,
};
