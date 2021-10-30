const AuthController = require("./auth.controller");
const interceptor = require("../../../__mocks__/interceptor");
const ConflictException = require("../../common/exceptions/ConflictException");

const mockUser = {
  id: 1,
  email: "test@test.com",
};

const conflictUser = {
  id: 2,
  email: mockUser.email,
};

describe("Auth controller", () => {
  it("userRegisterHandler - should throw error when email conflicts", async () => {
    const authController = new AuthController();
    const authService = authController.authService;

    const req = interceptor.mockRequest();
    const res = interceptor.mockResponse();
    const next = interceptor.mockNext();
    req.body = mockUser;
    authService.getUser.mockReturnValueOnce(conflictUser);
    await authController.userRegisterHandler("customer")(req, res, next);

    expect(authService.getUser.mock.calls.length).toBe(1);
    expect(authService.getUser.mock.calls[0][0]).toBe("email");
    expect(authService.getUser.mock.calls[0][1]).toBe(mockUser.email);
    expect(authService.getUser.mock.results[0].value).toBe(conflictUser);

    const expected = new ConflictException();
    expect(next).toHaveBeenCalledWith(expected);
  });
});
