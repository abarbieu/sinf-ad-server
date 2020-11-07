require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || "localhost";

app.set("PORT", PORT);
app.set("IP", IP);

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

app.use(bodyParser.json({ limit: "500mb" }));

app.get("/api/", (req, res, next) => {
   res.header("Content-Type", "application/json");
   res.status(200).send(
      JSON.stringify(
         {
            title: "SINF Ad Server API",
            prefixCommandsWith: "/api/",
            mailCommands: {
               sendMail:
                  "post /mail/?replyto=theirEmail&name=theirName&subject=&content=whatTheyTyped",
            },
         },
         null,
         2
      )
   );
});

module.exports = app;
