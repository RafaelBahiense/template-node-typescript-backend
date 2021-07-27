enum ServiceErrorCode {
  default,
  notExistent,
  wrongPassword,
}

export class ServiceError {
  public code: number = ServiceErrorCode.default;
  public message: string = "";

  public notExistent() {
    this.code = ServiceErrorCode.notExistent;
    this.message = "Not existent entry";
  }

  public wrongPassword() {
    this.code = ServiceErrorCode.wrongPassword;
    this.message = "Wrong user password";
  }
}

enum ConfigErrorCode {
  default,
}

export class ConfigError {
  public code: number = ConfigErrorCode.default;
  public message: string = "";
}

enum JwtErrorCode {
  SecretError,
  ExpirationError,
}

export class JwtConfigError extends ConfigError {
  public secretError() {
    this.code = JwtErrorCode.SecretError;
    this.message = "Invalid or missing JWT secret";
  }

  public expirationError() {
    this.code = JwtErrorCode.ExpirationError;
    this.message = "Expired JWT token";
  }
}

export const jwtConfig = new JwtConfigError();
export const service = new ServiceError();
