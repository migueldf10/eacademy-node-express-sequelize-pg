require('dotenv').config()

const data = {
  "development": {
    "url": `${process.env.DEV_DATABASE_URL}`,
    "dialect": "postgres",
    "operatorsAliases": "0"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "url": `${process.env.DATABASE_URL}`,
    "dialect": "postgres",
    "operatorsAliases": "0"
  }
}


module.exports = data