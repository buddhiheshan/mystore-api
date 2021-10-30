const interceptor = require("../../../__mocks__/interceptor");
const UnauthorizedException = require("../../common/exceptions/UnauthorizedException");
const { AuthenticationMiddleware } = require("./auth.middleware");
const jwt = require("jsonwebtoken");
const env = require("../../configs");
const getAuthService = require("../../services/auth/auth.service.injection");
const AuthMiddleware = require("./auth.middleware");
const ForbiddenException = require("../../common/exceptions/ForbiddenException");



describe("Auth Middleware", () => {
  describe("Authentication Middleware", () => {
    it("should throw 401 when request doesnt have auth headers!", async () => {
      const authMiddleware = new AuthMiddleware();
      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();

      const expected = new UnauthorizedException();
      await authMiddleware.AuthenticationMiddleware()(req, res, next);
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should throw 401 when auth method is incorrect!", async () => {
      const authMiddleware = new AuthMiddleware();
      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      // set header
      req.headers.authorization = `Basic fsdlfjsdfjklsdjflsdjfklsd`;

      const expected = new UnauthorizedException();
      await authMiddleware.AuthenticationMiddleware()(req, res, next);
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should throw 401 when jwt is malformed!", async () => {
      const authMiddleware = new AuthMiddleware();
      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      // set header
      req.headers.authorization = `Bearer fsdffsdljflsdjfklsdjfklsdjfklsdfjklsdjflsdjfkl`;

      const expected = new UnauthorizedException();
      await authMiddleware.AuthenticationMiddleware()(req, res, next);
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should throw 401 when jwt is generated with invlid data!", async () => {
      const authMiddleware = new AuthMiddleware();
      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();

      const user = {
        id: "asdad",
      };

      const Token = jwt.sign({ user_id: user.id }, env.SECRET, {
        expiresIn: env.TOKEN_VALIDITY,
      });
      // set header
      req.headers.authorization = `Bearer ${Token}`;

      const expected = new UnauthorizedException();
      await authMiddleware.AuthenticationMiddleware()(req, res, next);
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should bind a user to the request if jwt verified!", async () => {
      const authMiddleware = new AuthMiddleware();
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
      expect(authMiddleware.authService.getUser.mock.calls[0][1]).toBe(1);
      expect(authMiddleware.authService.getUser.mock.results[0].value).toBe(user);
      expect(next).toHaveBeenCalledWith();
      expect(req.user.user_id).toBe(user.id);
    });
  });

  describe('Authorization Middleware', () => {
    // it("should failed if request user is not defined", () => {
    //   const req = interceptor.mockRequest();
    //   const res = interceptor.mockResponse();
    //   const next = interceptor.mockNext();

    //   authMiddleware.AuthorizationMiddleware(["invalid"])(req, res, next);
    //   const expected = new ForbiddenException();

    //   expect(next).toHaveBeenCalledWith(expected);
    // });

    it("should throw 409 if user role is not in accepted roles", async () => {
      const authMiddleware = new AuthMiddleware();
      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();

      req.user = {
        user_id: 1
      }

      const roles = ["owner", "customer"];
      const expected = new ForbiddenException();

      authMiddleware.authService.getUserRoles.mockReturnValueOnce(roles);
      await authMiddleware.AuthorizationMiddleware(["staff"])(req, res, next);

      expect(authMiddleware.authService.getUserRoles.mock.calls.length).toBe(1);
      expect(authMiddleware.authService.getUserRoles.mock.calls[0][0]).toBe(req.user.user_id);
      expect(authMiddleware.authService.getUserRoles.mock.results[0].value).toBe(roles);
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should pass if user role is in accepted roles", async () => {
      const authMiddleware = new AuthMiddleware();
      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();

      req.user = {
        user_id: 1
      }
      const roles = ["owner", "customer"];

      authMiddleware.authService.getUserRoles.mockReturnValueOnce(roles);
      await authMiddleware.AuthorizationMiddleware(["owner"])(req, res, next);

      expect(authMiddleware.authService.getUserRoles.mock.calls.length).toBe(1);
      expect(authMiddleware.authService.getUserRoles.mock.calls[0][0]).toBe(req.user.user_id);
      expect(authMiddleware.authService.getUserRoles.mock.results[0].value).toBe(roles);
      expect(next).toHaveBeenCalledWith();
    });
  })
});