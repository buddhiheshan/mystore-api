const express = require("express");
const { knexConnection } = require("../database");
const User = require("../models/user.model");

const HelthCheckRouter = express.Router();

HelthCheckRouter.get("/", async (req, res, next) => {
  try {
    await knexConnection.raw("SELECT 1+1 as result");
    res.json({
      module: "database",
      status: "up",
    });
  } catch (error) {
    res.status(500).json({
      module: "database",
      status: "down",
    });
  }
});

module.exports = HelthCheckRouter;
