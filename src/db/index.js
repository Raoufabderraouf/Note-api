const mongoose = require("mongoose");
const NoteSchema = require("./NoteModel");
module.exports = {
  connect: () => {
    mongoose
      .connect(process.env.DB_HOST)
      .then(() => console.log(`Connected to MongoDB`))
      .catch((err) => console.log(err));
  },
  NoteModel: NoteSchema(mongoose),
};
