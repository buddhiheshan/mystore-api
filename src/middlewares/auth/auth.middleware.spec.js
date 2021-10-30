const interceptor = require("../../../__mocks__/interceptor");
const UnauthorizedException = require("../../common/exceptions/UnauthorizedException");
const { AuthenticationMiddleware } = require("./auth.middleware");
const jwt = require("jsonwebtoken");
const env = require("../../configs");
const getAuthService = require("../../services/auth/auth.service.injection");
const AuthMiddleware = require("./auth.middleware");

const authMiddleware = new AuthMiddleware();

describe("Authentication Middleware", () => {
  it("should throw 404 when request doesnt have auth headers!", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();

    const expected = new UnauthorizedException(
      "Unauthorized! Please login to proceed."
    );
    await authMiddleware.AuthenticationMiddleware()(req, res, next);
    expect(next).toHaveBeenCalledWith(expected);
  });

  it("should throw 404 when auth method is incorrect!", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();
    // set header
    req.headers.authorization = `Basic fsdlfjsdfjklsdjflsdjfklsd`;

    const expected = new UnauthorizedException();
    await authMiddleware.AuthenticationMiddleware()(req, res, next);
    expect(next).toHaveBeenCalledWith(expected);
  });

  it("should throw 404 when jwt is malformed!", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();
    // set header
    req.headers.authorization = `Bearer fsdffsdljflsdjfklsdjfklsdjfklsdfjklsdjflsdjfkl`;

    const expected = new UnauthorizedException();
    await authMiddleware.AuthenticationMiddleware()(req, res, next);
    expect(next).toHaveBeenCalledWith(expected);
  });

  it("should bind a user to the request if jwt verified!", async () => {
    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();

    const user = {
      id: 1,
    };

    const validToken = jwt.sign({ user_id: user.id }, env.SECRET, {
      expiresIn: env.TOKEN_VALIDITY,
    });
    // set header
    req.headers.authorization = `Bearer ${validToken}`;

    authMiddleware.authService.getUser.mockReturnValueOnce(user);
    await authMiddleware.AuthenticationMiddleware()(req, res, next);
    expect(authMiddleware.authService.getUser.mock.calls.length).toBe(1);
    expect(authMiddleware.authService.getUser.mock.calls[0][0]).toBe("id");
    expect(authMiddleware.authService.getUser.mock.results[0].value).toBe(user);
    expect(next).toHaveBeenCalledWith();
    expect(req.user.user_id).toBe(user.id);
  });
});
