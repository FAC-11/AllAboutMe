const mergeObj = array => {
  let obj = {};
  let newKey = 'message';
  let number = 1;
  array.forEach(result => {
    (Object.keys(result)).map((key) => {
      if (!obj[key]) {
        obj[key] = result[key];
      } else {
        number += 1;
        obj[newKey + number] = result[key];
      }
    });
  });
  return obj;
};

module.exports = mergeObj;
