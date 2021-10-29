const express = require("express");
const { userRegisterHandler, userLoginHandler, patchUserHandler, getUserDetailsHandler } = require("../controllers/auth.controller");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { registerUser, loginUser, patchUser } = require("../validation/user.schema");

const AuthRouter = express.Router();

// Register Routers
AuthRouter.post("/owner/register", ValidationMiddleware(registerUser), userRegisterHandler("owner"));
AuthRouter.post("/staff/register", AuthenticationMiddleware, AuthorizathionMiddleware(["owner"]), ValidationMiddleware(registerUser), userRegisterHandler("staff"));
AuthRouter.post("/customer/register", ValidationMiddleware(registerUser), userRegisterHandler("customer"));

// Login Routers
AuthRouter.post("/login", ValidationMiddleware(loginUser), userLoginHandler);

// Me Router
AuthRouter.get("/me", AuthenticationMiddleware, getUserDetailsHandler);
// !allow email change?
AuthRouter.patch("/me", AuthenticationMiddleware, ValidationMiddleware(patchUser), patchUserHandler);

module.exports = AuthRouter;
