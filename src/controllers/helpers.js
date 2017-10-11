const mergeObj = array => {
  let obj = {};
  array.forEach(result => {
    (Object.keys(result)).map((key) => {
      console.log(obj[key]);
      if (!obj[key]) {
        obj[key] = result[key];
      }
    });
  });
  return obj;
};

module.exports = mergeObj;
