const test = require('tape');
const validate = require('../src/controllers/validate');


// testing validateName function
test("validateName tests", (t)=>{
  t.throws(()=>validate.validateName(''), 'Name is required', "Falsey name has correct error message");
  t.throws(()=>validate.validateName(1234), 'This is not a name', "Name must be a string");
  t.throws(()=>validate.validateName('a'), 'Please enter your fullname', 'single character name returns correct error message')
  t.throws(()=>validate.validateName('longlonglonglonglonglonglongname'), 'Name can be no longer than 20 characters', "Name that is longer than 20 characters returns correct error message");
  t.throws(()=>validate.validateName('!!!!'), 'Name must contain alphanumeric characters', 'name that contains non alphanumeric characters returns correct error message')
  t.end();
})

// testing validateEmail function
test("validateEmail tests", (t)=>{
  t.throws(()=>validate.validateEmail(''), 'Email is required', "Falsey email has correct error message");
  t.throws(()=>validate.validateEmail(1234), 'This is not a valid email', "Email must be a string");
  t.throws(()=>validate.validateEmail('email'), 'This is not a valid email', "Email must contain @ symbol");
  t.end();
})

// testing validatePassword function
test("validatePassword tests", (t)=>{
  t.throws(()=>validate.validatePassword(''), 'Please insert a password', "Falsey password has correct error message");
  t.throws(()=>validate.validatePassword(1234), 'This is not a valid password', "Password must be a string");
  t.throws(()=>validate.validatePassword('abcdef'), 'Minimum password length is 8 character', "Minimum Password should be 8 characters");
  t.end()
})

test("validateConfirmPassword", (t)=>{
t.throws(()=>validate.validateConfirmPassword(''), 'this field is required', "Falsey password has correct error message");
t.throws(()=>validate.validateConfirmPassword('hello1234', 'differentpassword'), "passwords don't match", "Password that don't match have correct error message");
t.end()
})
