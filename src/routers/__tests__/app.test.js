const request = require("supertest");
const app = require("../../app");

describe("GET /", () => {
  test("should respond with 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  test("should respond with 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
  });
});
