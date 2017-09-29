const validateName = (name) => {
  if (!name) {
    throw new TypeError('Name is required');
  }
  if (typeof name !== 'string') {
    throw new TypeError('This is not a name');
  }
  if (/\W/.test(name)) {
    throw new TypeError('Name must contain alphanumeric characters');
  }
  if (name.length <= 1) {
    throw new TypeError('Please enter your fullname');
  }
  if (name.length > 20) {
    throw new TypeError('You have exceeded our maximum amount of characters');
  }
};

const validateEmail = (email) => {
  if(!email) {
    throw new TypeError('Email is required');
  }
  if (typeof email !== 'string') {
    throw new TypeError('This is not a valid email');
  }
  if(!email.includes('@') {
    throw new TypeError('This is not a valid email');
  }
}

const validatePassword = (password) => {
  if(!password) {
    throw new TypeError('Please insert a password');
  }
  if (typeof password !== 'string') {
    throw new TypeError('This is not a valid password');
  }
  if (password.length < 8) {
    throw new TypeError('Your password is too short');
  }
  const passwordStrengthRegex = ('^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&*])');
  if(!passwordStrengthRegex.test(password)){
    throw new TypeError('Your password needs to contain at least one uppercase, one lowercase, one special character and one number');
  }
}

const validateConfirmPassword = (confirmPassword, password) = {
  if(!confirmPassword){
    throw new TypeError('this field is required');
  }
  if(password !== confirmPassword) {
    throw new TypeError ("passwords don't match");
  }
}

const validateRegistration (input) = {
  try {
    validateName(input.name);
    validateEmail(input.email);
    validatePassword(input.password);
    validateConfirmPassword(input.confirmPassword, input.password);
    return {isValid: true};
  }
  catch(e) {
    return {isValid: false, message: e.message};
  }
};

const validateLogin = (input) => {
  try {
    validateEmail(input.email);
    validatePassword(input.password);
    return {isValid: true};
  }
  catch(e) {
    return {isValid: false, message: e.message};
  }
}

module.exports {
validateName,
validateEmail,
validatePassword,
validateConfirmPassword,
validateRegistration,
validateLogin
};
