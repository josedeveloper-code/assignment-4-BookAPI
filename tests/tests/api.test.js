const request = require("supertest");
const app = require("../server");

test("GET /api/books", async () => {
    const response = await request(app).get("/api/books");
    expect(response.statusCode).tobe(200);
});

