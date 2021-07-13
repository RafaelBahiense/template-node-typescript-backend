import supertest from "supertest";

import "../../src/config/env";
import app from "../../src/app";
import { truncateTable, endConnection } from "../helpers/database";
import { RegisterUser } from "../helpers/userTypes";

beforeAll(async () => {
  await truncateTable("users");
});

afterAll(async () => {
  await truncateTable("users");
  endConnection();
});

describe("POST /api/register", () => {
  const registerRoute = "/api/register";

  it("returns status 400 for invalid name", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ name: null }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for name length less than 3", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ name: "Ne" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for name length greater than 30", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ name: "NewJestNewJestNewJestNewJestNewJest" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty name", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ name: "" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ email: null }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty email", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ email: "" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for invalid password", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ password: null }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty password", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ password: "" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length greater than 100", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(
        new RegisterUser({
          password:
            "12345678123456781234567812345678123456781234567812345678123456781234564534587347612343214234576542348",
        })
      );
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length less than 8", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({ password: "1234567" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 201 for valid params", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({}));
    expect(result.status).toEqual(201);
  });

  it("returns status 409 for existent params", async () => {
    const result = await supertest(app)
      .post(registerRoute)
      .send(new RegisterUser({}));
    expect(result.status).toEqual(409);
  });
});
