// // integration.test.ts

// const request = require("supertest");
// import { app } from "./src/index"; // Assuming your Express app is exported from app.ts

// describe("Integration Tests for API Endpoints", () => {
//   // Test for User Authentication Endpoints
//   it("POST /api/v1/user/register should register a new user", async () => {
//     const response = await request(app).post("/api/v1/user/register").send({
//       username: "testuser",
//       email: "testuser@example.com",
//       password: "password123",
//     });

//     expect(response.status).toBe(200); // Assuming 200 for successful registration
//     expect(response.body).toHaveProperty("token");
//   });

//   it("POST /api/v1/user/login should log in a user", async () => {
//     const response = await request(app).post("/api/v1/user/login").send({
//       email: "testuser@example.com",
//       password: "password123",
//     });

//     expect(response.status).toBe(200); // Assuming 200 for successful login
//     expect(response.body).toHaveProperty("token");
//   });

//   // Test for Post Management Endpoints
//   let token: string; // Variable to store JWT token for authenticated requests
//   beforeAll(async () => {
//     // Log in as a user to obtain JWT token
//     const loginResponse = await request(app).post("/api/v1/user/login").send({
//       email: "testuser@example.com",
//       password: "password123",
//     });

//     token = loginResponse.body.token;
//   });

//   it("POST /api/v1/post should create a new post", async () => {
//     const response = await request(app)
//       .post("/api/v1/post")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         content: "Test post content",
//       });

//     expect(response.status).toBe(200); // Assuming 200 for successful post creation
//     expect(response.body).toHaveProperty("id");
//   });

//   // Add tests for other Post Management Endpoints similarly

//   // Test for Social Interaction Endpoints
//   it("GET /api/v1/user/follow/:id should follow a user", async () => {
//     const response = await request(app)
//       .get("/api/v1/user/follow/123") // Assuming 123 is the ID of the user to follow
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200); // Assuming 200 for successful follow
//     expect(response.body).toHaveProperty(
//       "message",
//       "User followed successfully"
//     );
//   });

//   // Add tests for other Social Interaction Endpoints similarly
// });
