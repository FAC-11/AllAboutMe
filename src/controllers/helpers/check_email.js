const checkEmail = (emailAddress) => {
  if (!emailAddress) {
    throw new Error('Please enter an email address before sending the form');
  }
};

module.exports = checkEmail;
