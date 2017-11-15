const test = require('tape');
const validate = require('../src/controllers/helpers/validate');


// testing validateName function
test('validateName tests', (t) => {
  t.throws(() => validate.validateName(''), 'Name is required', "Falsey name has correct error message");
  t.throws(() => validate.validateName(1234), 'This is not a name', "Name must be a string");
  t.throws(() => validate.validateName('a'), 'Please enter your fullname', 'single character name returns correct error message');
  t.throws(() => validate.validateName('longlonglonglonglonglonglongname'), 'Name can be no longer than 20 characters', "Name that is longer than 20 characters returns correct error message");
  t.throws(() => validate.validateName('!!!!'), 'Name must contain alphanumeric characters', 'name that contains non alphanumeric characters returns correct error message');
  t.end();
});

// testing validateEmail function
test('validateEmail tests', (t) => {
  t.throws(() => validate.validateEmail(''), 'Email is required', "Falsey email has correct error message");
  t.throws(() => validate.validateEmail(1234), 'This is not a valid email', "Email must be a string");
  t.throws(() => validate.validateEmail('email'), 'This is not a valid email', "Email must contain @ symbol");
  t.end();
});

// testing validatePassword function
test('validatePassword tests', (t) => {
  t.throws(() => validate.validatePassword(''), 'Please insert a password', "Falsey password has correct error message");
  t.throws(() => validate.validatePassword(1234), 'This is not a valid password', "Password must be a string");
  t.throws(() => validate.validatePassword('abcdef'), 'Minimum password length is 8 character', "Minimum Password should be 8 characters");
  t.end();
});

test('validateConfirmPassword', (t) => {
  t.throws(() => validate.validateConfirmPassword(''), 'this field is required', "Falsey password has correct error message");
  t.throws(() => validate.validateConfirmPassword('hello1234', 'differentpassword'), "passwords don't match", "Password that don't match have correct error message");
  t.end();
});

// testing registration function
test('validateSignUp', (t)=>{
  let input = {name:'jen', email:'jen@gmail.com', password:'mynameisjen', confirmPassword: 'mynameisjen'};
  let actual = validate.validateSignUp(input).isValid;
  t.ok(actual, 'returns object with isValid set to true if input is valid');
  // checks if inputs are wrong
  input = {name:'jen', email:'jen@gmail.com', password:'mynameisjen', confirmPassword: 'mynameisjohn'};
  actual = validate.validateSignUp(input).message;
  t.ok(actual, "passwords don't match", 'returns error message when isValid set to false');
  t.end();
});

// testing validatePasswordUpdate function
test('validatePasswordUpdate', (t) => {
  let input = { password:'mynameisdak', confirmPassword: 'mynameisdak'};
  let actual = validate.validatePasswordUpdate(input).isValid;
  t.ok(actual, 'returns object with isValid set to true if input is valid');
  input = {password:'mynameisdak', confirmPassword: 'mynameisrebe'};
  actual = validate.validatePasswordUpdate(input).isValid;
  t.notok(actual, 'returns object with isValid set to false if passwords dont match');
  t.end();
});

test('validateSendEmail', (t) => {
  let input = { email: 'jen@gmail.com' };
  let actual = validate.validateSendEmail(input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  input = { email: 'jengmail.com' };
  actual = validate.validateSendEmail(input).message;
  t.equal(actual, 'This is not a valid email', 'Correct error message for invalid email');
  t.end();
});

test.onFinish(()=>process.exit());
