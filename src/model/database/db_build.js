const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');
const QueryFile = require('pg-promise').QueryFile;

const sqlBuild = fs.readFileSync(path.join(__dirname, 'db_build.sql'), 'utf8');

const getSqlFile = (filePath) => {
  return new QueryFile(filePath, { minify: true });
};
const buildFile = getSqlFile(path.join(__dirname, 'db_build.sql'));

const build = () => {
  return dbConnection.any(buildFile)
    .then(() => {
      console.log('Database build successful.');
    })
    .catch((error) => {
      console.log(error);
    });
}

/* instanbul ignore if */
if (require === module) {
  build();
}

build();
module.exports = build;
