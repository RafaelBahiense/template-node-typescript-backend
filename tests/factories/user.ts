import faker from "faker";

interface User {
  email: string | null;
  password: string | null;
  name?: string | null;
}

const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password(8);
const fakeName = faker.name.findName();

export class LoginUser implements User {
  email: string | null;
  password: string | null;
  constructor({ email = fakeEmail || null, password = fakePassword || null }) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterUser implements User {
  name: string | null;
  email: string | null
  password: string | null;
  constructor({
    name = fakeName || null,
    email = fakeEmail || null,
    password = fakePassword || null,
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
