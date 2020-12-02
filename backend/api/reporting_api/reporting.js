require("dotenv").config({ path: "../" });

const { Client } = require("pg");
const config = {
   database: process.env.PGDATABASE,
   host: process.env.PGHOST,
   ssl: { rejectUnauthorized: false },
};
const client = new Client(config);
client.connect((err) => {
   if (err) {
      console.error("error connecting", err.stack);
   } else {
      console.log("connected");
      client.end();
   }
});

const statsdb = process.env.STATSDB || "statsdb";

const createEntry = (req, res) => {
   res.header("Content-Type", "application/json");
   const adId = req.params.adId;
   const adName = req.body.adName;
   const flightId = req.body.flightId;
   // make entry in statsdb under the same adId
   client.query(
      `INSERT INTO ${statsdb} VALUES ($1, $2, $3, 0, 0, 0) `,
      [adId, adName, flightId],
      (err) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         res.status(200).json({ status: "success" });
      }
   );
};

const updateStats = (req, res) => {
   const adId = req.params.adId;
   const impressions = req.body.impressions;
   const conversions = req.body.conversions;
   const clicks = req.body.clicks;
   client.query(
      `UPDATE ${statsdb} SET impressions = $2, conversions = $3, clicks = $4 WHERE ("adId" = $1)`,
      [adId, impressions, clicks, conversions],
      (err, results) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         res.status(200).json({ status: "success" });
      }
   );
};

const getStats = (req, res) => {
   res.header("Content-Type", "application/json");
   const adId = req.params.adId;
   client.query(
      `SELECT * FROM ${statsdb} WHERE "adId" = $1`,
      [adId],
      (err, res2) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         var jsonOutput = {
            adId: adId,
            adName: res2.rows[0]["adName"],
            flightId: res2.rows[0]["flightId"],
            impressions: res2.rows[0]["impressions"],
            clicks: res2.rows[0]["clicks"],
            conversions: res2.rows[0]["conversions"],
         };
         res.status(200).json({ status: "success", adStatsObject: jsonOutput });
      }
   );
};

const deleteStats = (req, res) => {
   res.header("Content-Type", "application/json");
   const adId = req.params.adId;
   client.query(
      `DELETE FROM ${statsdb} where "adId"= $1`,
      [adId],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         res.status(200).json({ status: "success" });
      }
   );
};

const getStatsByFlightId = (req, res) => {
   res.header("Content-Type", "application/json");
   const flightId = req.params.flightId;
   client.query(
      `SELECT * from ${statsdb} WHERE "flightId" = $1`,
      [flightId],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         var adStatsObjects = [];
         for (i = 0; i < result.rows.length; i++) {
            var adStatsObject = {
               adStatsObject: {
                  adId: result.rows[i]["adId"],
                  adName: result.rows[i]["adName"],
                  flightId: result.rows[i]["flightId"],
                  impressions: result.rows[i]["impressions"],
                  clicks: result.rows[i]["clicks"],
                  conversions: result.rows[i]["conversions"],
               },
            };
            adStatsObjects.push(adStatsObject);
         }
         res.status(200).json({
            status: "success",
            adStatsObjects: adStatsObjects,
         });
      }
   );
};

const getSummedStats = (req, res) => {
   res.header("Content-Type", "application/json");
   const flightId = req.params.flightId;
   client.query(
      `SELECT sum("impressions") as impressions, sum("clicks") as clicks, sum("conversions") as conversions from ${statsdb} GROUP BY "flightId" having "flightId" = $1`,
      [flightId],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         var summedAdsObject = {
            flightId: flightId,
            impressions: result.rows[0]["impressions"],
            clicks: result.rows[0]["clicks"],
            conversions: result.rows[0]["conversions"],
         };
         res.status(200).json({
            status: "success",
            summedAdsObject: summedAdsObject,
         });
      }
   );
};

module.exports = {
   createEntry,
   getStats,
   updateStats,
   getStatsByFlightId,
   deleteStats,
   getSummedStats,
};
