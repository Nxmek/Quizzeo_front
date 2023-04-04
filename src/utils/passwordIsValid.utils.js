export const REGEX = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10000}$/,
};

export const regexIsOk = (regex, value) => regex.test(value);
export const passwordIsValid = (password) =>
  regexIsOk(REGEX.password, password);
