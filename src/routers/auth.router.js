const express = require("express");
const AuthController = require("../controllers/auth/auth.controller");
const AuthMiddleware = require("../middlewares/auth/auth.middleware");
const {
    AuthenticationMiddleware,
    AuthorizathionMiddleware,
} = require("../middlewares/auth/auth.middleware");
const {
    ValidationMiddleware,
} = require("../middlewares/validation/validation.middleware");
const {
    registerUser,
    loginUser,
    patchUser,
} = require("../validation/user.schema");

const AuthRouter = express.Router();
const authMiddleware = new AuthMiddleware();
const authController = new AuthController();

// Register Routers
AuthRouter.post(
    "/owner/register",
    ValidationMiddleware(registerUser),
    authController.userRegisterHandler("owner")
);
AuthRouter.post(
    "/staff/register",
    authMiddleware.AuthenticationMiddleware(),
    authMiddleware.AuthorizationMiddleware(["owner"]),
    ValidationMiddleware(registerUser),
    authController.userRegisterHandler("staff")
);
AuthRouter.post(
    "/customer/register",
    ValidationMiddleware(registerUser),
    authController.userRegisterHandler("customer")
);

// Login Routers
AuthRouter.post(
    "/login",
    ValidationMiddleware(loginUser),
    authController.userLoginHandler()
);

// Me Router
AuthRouter.get(
    "/me",
    authMiddleware.AuthenticationMiddleware(),
    authController.getUserDetailsHandler()
);
// !allow email change?
AuthRouter.patch(
    "/me",
    authMiddleware.AuthenticationMiddleware(),
    ValidationMiddleware(patchUser),
    authController.patchUserHandler()
);

module.exports = AuthRouter;
