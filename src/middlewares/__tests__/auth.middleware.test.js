// const mongoose = require("mongoose");
const { AuthenticationMiddleware } = require("../auth.middleware");
const interceptor = require("../../../__mocks__/interceptor");
const UnauthorizedException = require("../../common/exceptions/UnauthorizedException");
const jwt = require("jsonwebtoken");
const { SECRET, TOKEN_VALIDITY } = require("../../configs/index");

// const Admin = require("../../../api/models/Admin");

describe("Authentication Middleware Testing", () => {
  test("should fail if there is no authorization header", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();

    const expected = new UnauthorizedException("Unauthorized! Please login to proceed.");
    await AuthenticationMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expected);
  });

  test("should fail if auth type is invalid", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();
    const token = jwt.sign(
      {
        user_id: "test-id",
      },
      SECRET,
      { expiresIn: TOKEN_VALIDITY }
    );

    req.headers.authorization = `invalid_auth_type ${token}`;

    const expected = new UnauthorizedException("!uth type invalid!");
    await AuthenticationMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expected);
  });

  test("should fail if token is invalid", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();
    req.headers.authorization = `Bearer this_is_invalid_token`;

    const expected = new UnauthorizedException("jwt malformed!");
    await AuthenticationMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expected);
  });

  // !TODO
  // test("should fail if token is valid & user not exists", async () => {
  //   const req = interceptor.mockRequest();
  //   const res = interceptor.mockResponse();
  //   const next = interceptor.mockNext();
  //   const token = jwt.sign(
  //     {
  //       user_id: "test-id",
  //     },
  //     SECRET,
  //     { expiresIn: TOKEN_VALIDITY }
  //   );
  //   req.headers.authorization = `Bearer ${token}`;

  //   const expected = new UnauthorizedException("Unauthorized! Please login to proceed.");

  //   await AuthenticationMiddleware(req, res, next);
  //   expect(next).toHaveBeenCalledWith(expected);
  //   expect(req.user).toBeUndefined();
  // });

  // test("should success if token is valid & user exists", async () => {
  //   const req = interceptor.mockRequest();
  //   const res = interceptor.mockResponse();
  //   const next = interceptor.mockNext();
  //   const user = new Admin({
  //     first_name: "test_first",
  //     last_name: "test_last",
  //     role: "admin",
  //     password: "hashed",
  //     mobile: "test mobile",
  //   });
  //   await user.save();
  //   let token = jwt.sign(
  //     {
  //       user_id: user._id,
  //       role: "admin",
  //     },
  //     SECRET,
  //     { expiresIn: "1d" }
  //   );

  //   req.headers.authorization = `Bearer ${token}`;

  //   await checkAuth(req, res, next);
  //   expect(req.user).toBeDefined();
  //   expect(next).toHaveBeenCalledWith();
  // });
});
