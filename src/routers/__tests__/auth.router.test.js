// process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
// const User = require("../../../api/models/UserBase");

const ownerUserPayload = {
  firstName: "owner",
  lastName: "owner",
  email: "owner@mystore.com",
  password: "@A12345678b",
  address: "Owner, Mystore",
  mobile: "0717726169",
};

const staffUserPayload = {
  firstName: "staff",
  lastName: "staff",
  email: "staff@mystore.com",
  password: "@A12345678b",
  address: "Staff, Mystore",
  mobile: "0717726168",
};

const customerUserPayload = {
  firstName: "customer",
  lastName: "customer",
  email: "customer@mystore.com",
  password: "@A12345678b",
  address: "Customer, Mystore",
  mobile: "0717726168",
};

const ownerResgisterEndPoint = "/api/v1/auth/owner/register";
const staffResgisterEndPoint = "/api/v1/auth/staff/register";
const customerResgisterEndPoint = "/api/v1/auth/customer/register";
const loginEndPoint = "/api/v1/auth/login";

// let adminToken;

describe(`Auth module`, () => {
  it(`should be able to create owner user`, async (done) => {
    const response = await request(app).post(ownerResgisterEndPoint).send(ownerUserPayload);

    expect(response.status).toBe(201);
    let createdUser = await User.find({ mobile: adminUserPayload.mobile });
    expect(createdUser.length).toBe(1);
    expect(createdUser[0].role).toEqual("admin");
    done();
  });

  //   it("should not be able to create a user with same mobile number", async (done) => {
  //     const response = await request(app).post(adminRegisterEndPoint).send(adminUserPayload);

  //     expect(response.status).toBe(409);
  //     let createdUser = await User.find({ mobile: adminUserPayload.mobile });
  //     // user count with still should be 1
  //     expect(createdUser.length).toBe(1);
  //     done();
  //   });

  //   it(`should handle inputs on user register`, async (done) => {
  //     let { first_name, last_name, password } = adminUserPayload;

  //     const response = await request(app).post(adminRegisterEndPoint).send({
  //       first_name,
  //       last_name,
  //       password,
  //     });
  //     expect(response.status).toBe(422);
  //     done();
  //   });

  //   it(`admin should be able to login`, async (done) => {
  //     const { password, mobile } = adminUserPayload;
  //     const response = await request(app).post(adminLoginEndPoint).send({
  //       password,
  //       mobile,
  //     });
  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("token");
  //     done();
  //     adminToken = response.body.token;
  //   });

  //   it(`public user should not be access admin protected routes`, async (done) => {
  //     const response = await request(app).get(adminProtectedRouteEndPoint);
  //     expect(response.status).not.toBe(200);
  //     done();
  //   });

  //   it(`authorized user should be access protected routes`, async (done) => {
  //     var bearerToken = `Bearer ${adminToken}`;
  //     const response = await request(app).get(adminProtectedRouteEndPoint).set({ authorization: bearerToken });
  //     expect(response.status).toBe(200);
  //     done();
  //   });

  //   it(`admin should be able to create owners`, async (done) => {
  //     var bearerToken = `Bearer ${adminToken}`;
  //     const response = await request(app).post(ownerRegisterEndPoint).set({ authorization: bearerToken }).send(ownerUserPayload);

  //     expect(response.status).toBe(201);
  //     let createdUser = await User.find({ mobile: ownerUserPayload.mobile });
  //     expect(createdUser.length).toBe(1);
  //     expect(createdUser[0].role).toEqual("owner");
  //     done();
  //   });
});
