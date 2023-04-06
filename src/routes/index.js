const noteRoutes = require("./NoteRoutes");
const AuthRoutes = require("./AuthRoutes");

module.exports = (app) => {
  app.get("/status", (req, res, next) => {
    res.send("ok");
  });
  noteRoutes(app);
  AuthRoutes(app);
};
