const AuthController = require("./auth.controller");
const interceptor = require("../../../__mocks__/interceptor");
const ConflictException = require("../../common/exceptions/ConflictException");
const UnauthorizedException = require("../../common/exceptions/UnauthorizedException");
const ValidationException = require('../../common/exceptions/ValidationException')

const existingUser = {
  id: 1,
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  password: "test123",
  address: 'test, test',
  mobile: '0711234567',
  roles: ['test']
};

describe("Auth Controller", () => {
  describe("userRegisterHandler", () => {
    it("should throw error when email conflicts", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {
        firstName: "mockuser",
        lastName: "mockuser",
        email: existingUser.email,
        password: "mockuser",
        address: 'mockuser, mockuser',
        mobile: '0711234567'
      };

      authService.getUser.mockReturnValueOnce(existingUser);
      await authController.userRegisterHandler("customer")(req, res, next);

      expect(authService.getUser.mock.calls.length).toBe(1);
      expect(authService.getUser.mock.calls[0][0]).toBe("email");
      expect(authService.getUser.mock.calls[0][1]).toBe(req.body.email);
      expect(authService.getUser.mock.results[0].value).toBe(existingUser);

      const expected = new ConflictException();
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should throw error when mobile conflicts", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {
        firstName: "mockuser",
        lastName: "mockuser",
        email: "mockuser@test.com",
        password: "mockuser",
        address: 'mockuser, mockuser',
        mobile: existingUser.mobile
      };

      authService.getUser.mockReturnValueOnce().mockReturnValueOnce(existingUser);
      await authController.userRegisterHandler("customer")(req, res, next);

      expect(authService.getUser.mock.calls.length).toBe(2);
      expect(authService.getUser.mock.calls[1][0]).toBe("mobile");
      expect(authService.getUser.mock.calls[1][1]).toBe(req.body.mobile);
      expect(authService.getUser.mock.results[1].value).toBe(existingUser);

      const expected = new ConflictException();
      expect(next).toHaveBeenCalledWith(expected);
    });
    it("should bind user to the response of user created", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {
        firstName: "mockuser",
        lastName: "mockuser",
        email: "mockuser@test.com",
        password: "mockuser",
        address: 'mockuser, mockuser',
        mobile: '0711234567'
      };

      authService.createUser.mockReturnValueOnce(req.body)
      await authController.userRegisterHandler("customer")(req, res, next);

      expect(authService.createUser.mock.calls.length).toBe(1);
      expect(authService.createUser.mock.calls[0][0]).toBe("customer");
      expect(authService.createUser.mock.calls[0][1]).toBe(req.body);
      expect(authService.createUser.mock.results[0].value).toBe(req.body);

      expect(res.status.mock.calls.length).toBe(1)
      expect(res.status.mock.calls[0][0]).toBe(201)
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toBe(req.body)
    });

  });

  describe("userLoginHandler", () => {
    it("should throw error if user with email not exist", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {
        email: "mockuser@test.com",
        password: "mockuser",
      };

      authService.getUser.mockReturnValueOnce();
      await authController.userLoginHandler()(req, res, next);

      expect(authService.getUser.mock.calls.length).toBe(1);
      expect(authService.getUser.mock.calls[0][0]).toBe("email");
      expect(authService.getUser.mock.calls[0][1]).toBe(req.body.email);
      expect(authService.getUser.mock.results[0].value).toBe();

      const expected = new UnauthorizedException;
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should throw error if password mismatch", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {
        email: "mockuser@test.com",
        password: "mock123",
      };

      authService.getUser.mockReturnValueOnce(existingUser);
      authService.comparePassword.mockReturnValueOnce(req.body.password === existingUser.password);
      const expected = new UnauthorizedException;
      await authController.userLoginHandler()(req, res, next);
      expect(authService.comparePassword.mock.calls.length).toBe(1);
      expect(authService.comparePassword.mock.calls[0][0]).toBe(req.body.password);
      expect(authService.comparePassword.mock.calls[0][1]).toBe(existingUser.password);
      expect(authService.comparePassword.mock.results[0].value).toBe(false);
      expect(next).toHaveBeenCalledWith(expected);

    });

    it("should pass if credentials valid", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {
        email: existingUser.email,
        password: existingUser.password,
      };

      authService.getUser.mockReturnValueOnce(existingUser);
      authService.comparePassword.mockReturnValueOnce(req.body.password === existingUser.password);
      await authController.userLoginHandler()(req, res, next);

      expect(authService.getUser.mock.calls.length).toBe(1);
      expect(authService.getUser.mock.calls[0][0]).toBe("email");
      expect(authService.getUser.mock.calls[0][1]).toBe(req.body.email);
      expect(authService.getUser.mock.results[0].value).toBe(existingUser);

      expect(authService.comparePassword.mock.calls.length).toBe(1);
      expect(authService.comparePassword.mock.calls[0][0]).toBe(req.body.password);
      expect(authService.comparePassword.mock.calls[0][1]).toBe(existingUser.password);
      expect(authService.comparePassword.mock.results[0].value).toBe(true);

      expect(res.status.mock.calls.length).toBe(1)
      expect(res.status.mock.calls[0][0]).toBe(200)
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.body.success).toBe(true)
    });


  })
  describe("patchUserHandler", () => {
    it("should throw error if the body is empty", async () => {
      const authController = new AuthController();

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();
      req.body = {};


      await authController.patchUserHandler()(req, res, next);
      const expected = new ValidationException([]);
      expect(next).toHaveBeenCalledWith(expected);
    });

    it("should pass bind edited item to the response", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();

      req.user = {
        user_id: 1
      }
      req.body = {
        firstName: "mockEditName"
      };

      authService.patchUser.mockReturnValueOnce(existingUser);
      await authController.patchUserHandler()(req, res, next);
      expect(authService.patchUser.mock.calls.length).toBe(1);
      expect(authService.patchUser.mock.calls[0][0]).toBe(req.user.user_id);
      expect(authService.patchUser.mock.calls[0][1]).toBe(req.body);
      expect(authService.patchUser.mock.results[0].value).toBe(existingUser);

      expect(res.status.mock.calls.length).toBe(1)
      expect(res.status.mock.calls[0][0]).toBe(201)
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toBe(existingUser)
    });
  });
  describe("getUserDetailsHandler", () => {
    it("should pass and bind user details to the response", async () => {
      const authController = new AuthController();
      const authService = authController.authService;

      const req = interceptor.mockRequest();
      const res = interceptor.mockResponse();
      const next = interceptor.mockNext();

      req.user = {
        user_id: 1
      }

      authService.getUser.mockReturnValueOnce(existingUser);
      await authController.getUserDetailsHandler()(req, res, next);
      expect(authService.getUser.mock.calls.length).toBe(1);
      expect(authService.getUser.mock.calls[0][0]).toBe("id");
      expect(authService.getUser.mock.calls[0][1]).toBe(req.user.user_id);
      expect(authService.getUser.mock.results[0].value).toBe(existingUser);

      expect(res.status.mock.calls.length).toBe(1)
      expect(res.status.mock.calls[0][0]).toBe(200)
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.body.success).toBe(true)
      expect(res.body.data).toBe(existingUser)
    });
  });

});

