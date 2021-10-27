const express = require("express");
// const ValidationMiddleware = require("../common/middlewares/validation.middleware");
// const { CreateUserDto } = require("../models/dto/create-user.dto");
const { userRegisterHandler } = require("../controllers/auth.controller");
const { ValidationMiddleware } = require("../middlewares/validation.middleware");
const { registerUser } = require("../validation/user.schema");

const AuthRouter = express.Router();

AuthRouter.post("/owner/register", ValidationMiddleware(registerUser), userRegisterHandler("owner"));
AuthRouter.post("/staff/register", ValidationMiddleware(registerUser), userRegisterHandler("staff"));
AuthRouter.post("/customer/register", ValidationMiddleware(registerUser), userRegisterHandler("customer"));

module.exports = AuthRouter;
