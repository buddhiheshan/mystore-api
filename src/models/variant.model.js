const { Model } = require("objection");

class Variant extends Model {
  static get tableName() {
    return "variant";
  }

  static get relationMappings() {
    const SKU = require("./sku.model");

    return {
      skus: {
        relation: Model.ManyToManyRelation,
        modelClass: SKU,
        join: {
          from: "variant.id",
          through: {
            from: "sku_variant.variantId",
            extra: ["value"],
            to: "sku_variant.skuId",
          },
          to: "sku.id",
        },
      },
    };
  }
}

module.exports = Variant;
