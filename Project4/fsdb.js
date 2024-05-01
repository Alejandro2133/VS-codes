const fs = require('fs');

const loadDatabase = (db_connection, schema = {}) => {
  if (!fs.existsSync(db_connection)) {
    fs.writeFileSync(db_connection, JSON.stringify(schema));
  }
  const model = require(db_connection);

  const db = {
    model,
    filename: db_connection,
    update: () => {
      fs.writeFileSync(db_connection, JSON.stringify(model));
    },
    addCollection: (collection) => {
      model[collection] = [];
    }
  };
  return db;
};

module.exports = loadDatabase;