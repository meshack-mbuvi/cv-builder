import chai from "chai";
import createApp from "../../src/lib/createApp";
import clearDatabase from "../cleardb";

import request from "supertest";

const { expect } = chai;

describe("Create user", () => {
  let server;
  beforeEach(async () => {
    const app = await createApp();
    server = await app.listen(3001);
    await clearDatabase();
  });

  afterEach(async () => {
    await server.close();
    await clearDatabase();
  });

  describe("POST /users/signup", async () => {
    it("should add a user to the system", async () => {
      const response = await request(server)
        .post("/v1/users/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@example.com",
          password: "test",
          confirmPassword: "test"
        });

      expect(response.status).to.equal(201);
      expect(response.body.data.message).to.equal(
        "User account created successfully"
      );
    });

    it("should return error for missing field", async () => {
      const response = await request(server).post("/v1/users/signup");

      expect(response.status).to.equal(400);

      const {
        body: { data }
      } = response;

      data.forEach(err => {
        Object.keys(err).forEach(key =>
          expect(err[key]).to.equal(`${key} is a required field`)
        );
      });
    });

    it("should return error for empty field", async () => {
      const response = await request(server)
        .post("/v1/users/signup")
        .send({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

      expect(response.status).to.equal(400);
      const {
        body: { data }
      } = response;

      data.forEach(err => {
        Object.keys(err).forEach(key => {
          if (key === "email") {
            expect(err[key]).to.equal(
              `${key} must be in the form example@domain.com`
            );
          } else {
            expect(err[key]).to.equal(`${key} field should not be empty`);
          }
        });
      });
    });

    // it("should validate email address", async () => {
    //   const response = await request(server)
    //     .post("/v1/users/signup")
    //     .send({
    //       firstName: "test",
    //       lastName: "test",
    //       email: "test@example",
    //       password: "test",
    //       confirmPassword: "test"
    //     });

    //   const {
    //     body: {
    //       data: [err]
    //     }
    //   } = response;

    //   expect(response.status).to.equal(400);
    //   expect(err).to.equal("email must be in the form example@domain.com");
    // });
  });
});
