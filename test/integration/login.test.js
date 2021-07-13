import supertest from "supertest";
import faker from "faker";

import "../../src/config/env";
import app from "../../src/app";
import { addUser, truncateTable, endConnection } from "../helpers/database";
import { LoginUser } from "../factories/user";

beforeAll(async () => {
  await truncateTable("users");
  await truncateTable("sessions");
  await addUser();
});

afterAll(async () => {
  await truncateTable("users");
  await truncateTable("sessions");
  endConnection();
});

describe("POST /api/login", () => {
  const loginRoute = "/api/login";
  const agent = supertest(app);

  it("returns status 400 for invalid email", async () => {
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ email: null }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty email", async () => {
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ email: "" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for invalid password", async () => {
    console.log(new LoginUser({ password: null }));
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ password: null }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty password", async () => {
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ password: "" }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length greater than 100", async () => {
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ password: faker.internet.password(101) }));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for password length less than 8", async () => {
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ password: faker.internet.password(7) }));
    expect(result.status).toEqual(400);
  });

  it("returns status 404 for not existent params", async () => {
    const result = await agent
      .post(loginRoute)
      .send(new LoginUser({ email: faker.internet.email() }));
    expect(result.status).toEqual(404);
  });

  it("returns status 200 for valid params", async () => {
    const result = await agent.post(loginRoute).send(new LoginUser({}));
    expect(result.status).toEqual(200);
  });
});
