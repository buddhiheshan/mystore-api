class FakeAuthService {
  createUser = jest.fn();
  getUser = jest.fn();
  getUserRoles = jest.fn();
  patchUser = jest.fn();
}

module.exports = FakeAuthService;
