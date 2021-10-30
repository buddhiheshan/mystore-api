const express = require("express");
const { AuthenticationMiddleware, AuthorizathionMiddleware } = require("../middlewares/auth/auth.middleware");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { registerUser, loginUser, patchUser } = require("../validation/user.schema");
const AuthController = require("../controllers/auth/auth.controller");

const AuthRouter = express.Router();
const authController = new AuthController();

// Register Routers
AuthRouter.post("/owner/register", ValidationMiddleware(registerUser), authController.userRegisterHandler("owner"));
AuthRouter.post("/staff/register", AuthenticationMiddleware(), AuthorizathionMiddleware(["owner"]), ValidationMiddleware(registerUser), authController.userRegisterHandler("staff"));
AuthRouter.post("/customer/register", ValidationMiddleware(registerUser), authController.userRegisterHandler("customer"));

// Login Routers
AuthRouter.post("/login", ValidationMiddleware(loginUser), authController.userLoginHandler());

// Me Router
AuthRouter.get("/me", AuthenticationMiddleware(), authController.getUserDetailsHandler());
// !allow email change?
AuthRouter.patch("/me", AuthenticationMiddleware(), ValidationMiddleware(patchUser), authController.patchUserHandler());

module.exports = AuthRouter;
