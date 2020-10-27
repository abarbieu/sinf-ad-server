const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
// const uuid = require("uuid");

let notes = [
   {
      id: 1,
      title: "hello, first note",
      content: "here is the content",
      date: moment().format("yyyy/MM/dd/hh:mm:hh"),
      archived: false,
   },
   {
      id: 2,
      title: "hello, second note",
      content: "here is the content",
      date: moment(),
      archived: false,
   },
   {
      id: 3,
      title: "hello, third note",
      content: "here is the content",
      date: moment().format("yyyy/MM/dd/hh:mm:hh"),
      archived: false,
   },
];
app.use((req, res, next) => {
   res.append("Access-Control-Allow-Origin", ["*"]);
   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
   res.append("Access-Control-Allow-Headers", "Content-Type");

   next();
});

app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);

app.use("/", (req, res, next) => {
   res.header("Content-Type", "application/json");
   console.log(req.path);
   next();
});

app.get("/notes/", (req, res) => {
   res.status(200).json(notes);
});

app.get("/notes/:id", (req, res) => {
   const id = parseInt(req.params.id);
   res.status(200).json(notes.filter((note) => note.id === id)[0]);
});

app.post("/notes/", (req, res) => {
   console.log("posting new note");
   const { title, content, archived } = req.body;
   if (!title) {
      res.status(400).json({
         err: "you must provide a title",
      });
   }
   notes = [
      ...notes,
      {
         title: title,
         content: content || "No content",
         archived: archived || false,
         id: notes.length + 1,
         date: moment(),
      },
   ];
   res.status(200).json({
      title: title,
      content: content || "No content",
      archived: archived || false,
      id: notes.length + 1,
      date: moment(),
   });
});

app.delete("/notes/:id", (req, res) => {
   const id = parseInt(req.params.id);
   notes = notes.filter((note) => note !== id);
   res.status(204).json({
      msg: "deleted",
      id,
   });
});

app.get("/", (req, res) => {
   res.status(200).json({
      hello: "Bad path, try /notes/",
   });
});

app.listen(54321, () => {
   console.log("started server");
});
