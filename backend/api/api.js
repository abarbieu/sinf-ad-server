require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const reportingRoutes = require("./routes/reportingRoutes.js");
const inventoryRoutes = require("./routes/inventoryRoutes.js");
const decisionRoutes = require("./routes/decisionRoutes.js");
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

app.use("/api/reporting/", reportingRoutes);
app.use("/api/decide/", decisionRoutes);

app.use("/api/inventory/", inventoryRoutes);

app.use("/api/images/", express.static("public"));

app.get("/api/reporting/", (req, res, next) => {
   res.header("Content-Type", "application/json");
   res.status(200).send(
      JSON.stringify(
         {
            title: "SINF Ad Server API",
            prefixCommandsWith: "/api/reporting",
         },
         null,
         2
      )
   );
});

app.get("/api/", (req, res, next) => {
   res.header("Content-Type", "application/json");
   res.status(200).send(
      JSON.stringify(
         {
            title: "SINF Ad Server API",
            prefixCommandsWith: "/api/",
         },
         null,
         2
      )
   );
});

module.exports = app;
