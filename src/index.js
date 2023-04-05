const dotenv = require("dotenv");
dotenv.config();
const db = require("./src/db");
db.connect();

//console.log(`DB_HOST`)
