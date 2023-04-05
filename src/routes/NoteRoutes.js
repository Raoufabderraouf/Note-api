const { NoteModel } = require("../db");

module.exports = (app) => {
  app.post("/notes", async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: `title and content are required`,
      });
    }
    if (title.trim().length > 50) {
      return res.status(400).json({
        message: `title is too long max 50 characters`,
      });
    }
    const note = await NoteModel.create({
      title: title.trim(),
      content: content.trim(),
    });
    return res.status(201).json({
      message: `Note created`,
      data: note,
    });
  });

  app.get("/notes", async (req, res, next) => {
    const notes = await NoteModel.find({});

    return res.status(200).json({
      message: "Note retrieve",
      data: notes,
    });
  });
  app.get("/notes/:id", async (req, res, next) => {
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    if (!note)
      return res.status(404).json({
        message: "Note not found ",
      });
    return res.status(200).json({
      message: "Note retrieved",
      data: note,
    });
  });
  app.put("/notes/:id", async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({
        message: "title or content are required",
      });
    }
    if (title && title.trim().length > 50) {
      return res.status(400).json({
        message: "title is too long max 50 characters",
      });
    }

    const note = await NoteModel.findById(id);
    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });
    if (title) note.title = title.trim();
    if (content) note.content = content.trim();

    await note.save;

    return res.status(200).json({
      message: "Note update",
      data: note,
    });
  });

  app.delete("/notes/:id", async (req, res, next) => {
    const { id } = req.params;

    const note = await NoteModel.findByIdAndDelete(id).catch((e) =>
      console.log(e)
    );

    if (!note)
      return res.status(404).json({
        message: "note not found ",
      });
    return res.status(200).json({
      message: "Note was deleted",
      data: note,
    });
  });
};
