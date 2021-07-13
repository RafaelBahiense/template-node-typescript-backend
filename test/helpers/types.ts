interface User {
  email: string;
  password: string;
  name?: string;
}

export class LoginUser implements User {
  email: string;
  password: string;
  constructor({ email = "jest@jest.br", password = "12345678" }) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterUser implements User {
  name: string;
  email: string;
  password: string;
  constructor({
    name = "Jest",
    email = "jest@jest.br",
    password = "12345678",
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
