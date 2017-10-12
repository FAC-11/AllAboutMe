const mergeObj = array => {
  let obj = {};
  let newKey = 'message';
  let number = 1;
  array.forEach(object => {
    (Object.keys(object)).map((key) => {
      if (!obj[key]) {
        obj[key] = object[key];
      } else if (key.indexOf('message') !==-1 && typeof object[key] !== number){
        number += 1;
        obj[newKey + number] = object[key];
      }
    });
  });
  return obj;
};

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

module.exports = {
mergeObj,
addData
};
