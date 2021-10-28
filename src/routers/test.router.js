const express = require("express");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");

const TestRouter = express.Router();

TestRouter.get("/", AuthenticationMiddleware, AuthorizathionMiddleware(["customer", "customer"]), (req, res, next) => {
  res.send("Hello this is a test route");
});

module.exports = TestRouter;
