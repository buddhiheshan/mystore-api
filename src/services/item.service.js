const Category = require("../models/category.model");
const ItemSKUVariant = require("../models/item-sku-variant.model");
const Item = require("../models/item.model");
const SKU = require("../models/sku.model");
const Variant = require("../models/variant.model");

const getItem = async (key, value) => {
  const item = await Item.query().where(key, "=", value).first();
  return item;
};

const createItem = async (data) => {
  const item = await Category.relatedQuery("items").for(data.category).insert({ name: data.name });

  await Promise.all(
    data.skus.map(async (sku) => {
      const newsku = await SKU.query().insert({
        price: sku.price,
        quantity: sku.quantity,
        discount: sku.discount,
      });
      return await Promise.all(
        Object.keys(sku.features).map(async (key) => {
          let feature = await Variant.query().insert({ name: key }).onConflict("name").ignore();
          if (feature.id === 0) {
            feature = await Variant.query().where("name", "=", key).first();
          }
          return await ItemSKUVariant.query().insert({ value: sku.features[key], itemId: item.id, skuId: newsku.id, variantId: feature.id });
        })
      );
    })
  );

  // const response = await Item.relatedQuery("category").for(1);
  const response = await Item.query().withGraphFetched("[category,skus.[variants]]").where("item.id", 1).first();

  console.log(response);
  return;
};

module.exports = {
  getItem,
  createItem,
};
