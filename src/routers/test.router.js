const express = require("express");

const TestRouter = express.Router();

TestRouter.get("/", (req, res, next) => {
  res.send("Hello this is a test route");
});

module.exports = TestRouter;
