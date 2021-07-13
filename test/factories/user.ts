import faker from "faker";

interface User {
  email: string;
  password: string;
  name?: string;
}

const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password(8);
const fakeName = faker.name.findName();

export class LoginUser implements User {
  email: string;
  password: string;
  constructor({ email = fakeEmail, password = fakePassword }) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterUser implements User {
  name: string;
  email: string;
  password: string;
  constructor({
    name = fakeName,
    email = fakeEmail,
    password = fakePassword,
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
