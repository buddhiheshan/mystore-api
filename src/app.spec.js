const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("should respond / with 200 status code", (done) => {
    request(app).get("/").expect("Content-Type", /json/).expect(200, done);
  });

  it("database connection should be initialized", (done) => {
    request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("status", "up");
        done();
      });
  });
});
