const addData = (object1, object2) => {
  const array = Object.keys(object2);
  array.forEach((key) => {
    if (key === 'email') {
      object1['useremail'] = object2['email'];
    } else if (!object1[key] && key !== 'email') {
      object1[key] = object2[key];
    }
  });
  return object1;
};

function generateToken() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

module.exports = {
  addData,
  generateToken,
};
