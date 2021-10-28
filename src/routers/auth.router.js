const express = require("express");
const { userRegisterHandler, userLoginHandler } = require("../controllers/auth.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { registerUser, loginUser } = require("../validation/user.schema");

const AuthRouter = express.Router();

// Register Routers
AuthRouter.post("/owner/register", ValidationMiddleware(registerUser), userRegisterHandler("owner"));
AuthRouter.post("/staff/register", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(registerUser), userRegisterHandler("staff"));
AuthRouter.post("/customer/register", ValidationMiddleware(registerUser), userRegisterHandler("customer"));

// Login Routers
AuthRouter.post("/owner/login", ValidationMiddleware(loginUser), userLoginHandler);
AuthRouter.post("/staff/login", ValidationMiddleware(loginUser), userLoginHandler);
AuthRouter.post("/customer/login", ValidationMiddleware(loginUser), userLoginHandler);

module.exports = AuthRouter;
