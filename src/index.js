const dotenv = require("dotenv");
dotenv.config();
const db = require("./db");

//console.log(`DB_HOST`)
async function main() {
  await db.connect();
  const note = await db.NoteModel.create({
    content: "this is my note's content",
    title: "this is my title",
  });
  console.log(note);
}
main();
