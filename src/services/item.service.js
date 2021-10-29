const Category = require("../models/category.model");
const SKUVariant = require("../models/sku-variant.model");
const Item = require("../models/item.model");
const SKU = require("../models/sku.model");
const Variant = require("../models/variant.model");

const getItem = async (key, value) => {
  const item = await Item.query().where(key, "=", value).first();
  return item;
};

const createItem = async ({ name, category, skus }) => {
  // Add to item table
  const item = await Category.relatedQuery("items").for(category).insert({ name: name });

  await Promise.all(
    skus.map(async (sku) => {
      const sku_entry = {
        price: sku.price,
        quantity: sku.quantity,
        discount: sku.discount,
      };
      const sku_added = await Item.relatedQuery("skus").for(item.id).insert(sku_entry);

      return await Promise.all(
        Object.keys(sku.features).map(async (name) => {
          let name_added = await Variant.query().insert({ name }).onConflict("name").ignore();

          if (name_added.id === 0) {
            name_added = await Variant.query().where("name", name).first();
          }

          return await SKUVariant.query().insert({ skuId: sku_added.id, variantId: name_added.id, value: sku.features[name] });
        })
      );
    })
  );

  return await Item.query().select("id", "name").withGraphFetched("[category,skus.[variants]]").where("item.id", item.id).first();
};

const getAllItems = async () => {
  return await Item.query().select("id", "name").withGraphFetched("[category,skus.[variants]]");
};

const getItemByID = async (id) => {
  return await Item.query().select("id", "name").withGraphFetched("[category,skus.[variants]]").where("item.id", id).first();
};

module.exports = {
  getItem,
  createItem,
  getAllItems,
  getItemByID,
};
