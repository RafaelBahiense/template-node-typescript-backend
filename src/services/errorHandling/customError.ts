enum CustomErrorCode {
  default,
  notExistent,
  wrongPassword
}

class CustomError {
    public code: number;

    public notExistent() {
        this.code = CustomErrorCode.notExistent;
    }

    public wrongPassword() {
        this.code = CustomErrorCode.wrongPassword;
    }

    constructor() {
        this.code = CustomErrorCode.default;
    }
}

export default new CustomError();


