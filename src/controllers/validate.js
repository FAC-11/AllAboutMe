const validateName = (name) => {
  if (!name) {
    throw new TypeError('Name is required');
  }
  if (typeof name !== 'string') {
    throw new TypeError('This is not a name');
  }
  if (/\W/.test(name)) {
    throw new TypeError("Name can't contain alphanumeric characters");
  }
  if (name.length <= 1) {
    throw new TypeError('Please enter your fullname');
  }
  if (name.length > 20) {
    throw new TypeError('Name can be no longer than 20 characters');
  }
};

const validateEmail = (email) => {
  if (!email) {
    throw new TypeError('Email is required');
  }
  if (typeof email !== 'string') {
    throw new TypeError('This is not a valid email');
  }

  if (!email.includes('@')) {
    throw new TypeError('This is not a valid email');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new TypeError('Please insert a password');
  }
  if (typeof password !== 'string') {
    throw new TypeError('This is not a valid password');
  }
  if (password.length < 8) {
    throw new TypeError('Minimum password length is 8 characters');
  }
};

const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    throw new TypeError('this field is required');
  }
  if (confirmPassword !== password) {
    throw new TypeError("passwords don't match");
  }
};


const validateSignUp = (input) => {
  try {
    validateName(input.name);
    validateEmail(input.email);
    validatePassword(input.password);
    validateConfirmPassword(input.confirmPassword, input.password);
    return { isValid: true };
  } catch (e) {
    return { isValid: false, message: e.message };
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateSignUp,
};
