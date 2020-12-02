require("dotenv").config({ path: "../" });

const axios = require("axios");
const fs = require("fs");
const { Client } = require("pg");
const { env } = require("process");
var connectionString = process.env.PG_CXN;
const client = new Client({
   connectionString: connectionString,
});
client.connect();

const addb = process.env.ADDB || "addb";

const storeAd = (req, res) => {
   res.header("Content-Type", "application/json");
   const image = new Buffer.from(req.body.image, "base64");
   const adName = req.body.adDataObject.adName;
   const mainText = req.body.adDataObject.mainText;
   const subText = req.body.adDataObject.subText;
   const linkText = req.body.adDataObject.linkText;
   const linkLoc = req.body.adDataObject.linkLoc;
   const width = req.body.adDataObject.width;
   const height = req.body.adDataObject.height;
   const flightId = req.body.adDataObject.flightId;
   const localStore = __dirname + "/../../public/" + adName + ".jpg";
   const imageLoc =
      "http://localhost:" + env.PORT + "/api/images/" + adName + ".jpg";
   fs.writeFile(localStore, image, function (err) {
      if (err) {
         res.status(500).json({
            status: "failure1",
            adDataObject: req.adDataObject,
         });
         return;
      }
      console.log("Ad image saved.");
   });

   client.query(
      `INSERT INTO addb ("adName", "imageLoc", "mainText", "subText", "linkText", "linkLocation", "width", "height", "flightId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [
         adName,
         imageLoc,
         mainText,
         subText,
         linkText,
         linkLoc,
         width,
         height,
         flightId,
      ],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure3", err });
            return;
         } else {
            console.log("Ad images inserted into addb");
         }
      }
   );

   client.query(
      `SELECT "adId" from ${addb} where "adName" = $1`,
      [adName],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure", err });
            return;
         }
         console.log(result.rows);
         var adId = getMax(result.rows, "adId");
         res.status(200).json({ status: "success1", adId: adId });
         // make entry in statsdb under the same adId
         const call = axios.post(
            "http://localhost:8080/api/reporting/" + adId,
            {
               adName: adName,
               flightId: flightId,
            }
         );

         call.status;
      }
   );
};

function getMax(arr, prop) {
   var max;
   for (var i = 0; i < arr.length; i++) {
      if (max == null || parseInt(arr[i][prop]) > max) {
         max = arr[i][prop];
      }
   }
   return max;
}

const getInventory = (req, res) => {
   res.header("Content-Type", "application/json");

   client.query(`SELECT * FROM ${addb}`, (err, result) => {
      if (err) {
         res.status(500).json({ status: "failure4", err });
         return;
      }
      var adDataObjects = [];
      for (i = 0; i < result.rows.length; i++) {
         const adDataObject = {
            adDataObject: {
               adId: result.rows[i]["adId"],
               adName: result.rows[i]["adName"],
               imageLoc: result.rows[i]["imageLoc"],
               mainText: result.rows[i]["mainText"],
               subText: result.rows[i]["subText"],
               linkText: result.rows[i]["linkText"],
               linkLoc: result.rows[i]["linkLocation"],
               height: result.rows[i]["height"],
               width: result.rows[i]["width"],
               flightId: result.rows[i]["flightId"],
            },
         };
         adDataObjects.push(adDataObject);
      }
      res.status(200).json({ status: "success", adDataObjects: adDataObjects });
   });
};

const updateAd = (req, res) => {
   res.header("Content-Type", "application/json");

   const adId = req.params.adId;
   const adName = req.body.adDataObject.adName;
   const mainText = req.body.adDataObject.mainText;
   const subText = req.body.adDataObject.subText;
   const linkText = req.body.adDataObject.linkText;
   const linkLoc = req.body.adDataObject.linkLoc;
   const width = req.body.adDataObject.width;
   const height = req.body.adDataObject.height;
   const flightId = req.body.adDataObject.flightId;
   const localStore = __dirname + "/../../public/" + adName + ".jpg";
   const imageLoc =
      "http://localhost:" + env.PORT + "/api/images/" + adName + ".jpg";
   const image = new Buffer.from(req.body.image, "base64");

   fs.writeFile(localStore, image, function (err) {
      if (err) {
         res.status(500).json({ status: "failure5", err });
         return;
      }
      console.log("Ad image updated.");
   });

   client.query(
      `UPDATE ${addb}
SET "adName" = $2, "imageLoc" = $3,  "mainText" = $4, "subText" = $5, "linkText" = $6, "linkLocation" = $7, "width" = $8, "height" = $9, "flightId" = $10
WHERE ("adId" = $1)`,
      [
         adId,
         adName,
         imageLoc,
         mainText,
         subText,
         linkText,
         linkLoc,
         width,
         height,
         flightId,
      ],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure6", err });
            return;
         }
         console.log("Ad image updated.");
         res.status(200).json({ status: "success" });
      }
   );
};

const getAd = (req, res) => {
   res.header("Content-Type", "application/json");
   const adId = req.params.adId;

   client.query(
      `SELECT * FROM ${addb} where "adId" = $1`,
      [adId],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure8", err });
            return;
         }
         const adDataObject = {
            adId: result.rows[0]["adId"],
            adName: result.rows[0]["adName"],
            imageLoc: result.rows[0]["imageLoc"],
            mainText: result.rows[0]["mainText"],
            subText: result.rows[0]["subText"],
            linkText: result.rows[0]["linkText"],
            linkLoc: result.rows[0]["linkLocation"],
            height: result.rows[0]["height"],
            width: result.rows[0]["width"],
            flightId: result.rows[0]["flightId"],
         };
         res.status(200).json({ status: "success", adDataObject });
      }
   );
};

const deleteAd = (req, res) => {
   res.header("Content-Type", "application/json");
   const adId = req.params.adId;
   const adName = req.body.adName;
   const localStore = __dirname + "/../../public/" + adName + ".jpg";
   fs.unlink(localStore, function (err) {
      console.log(localStore);
      console.log("\n");
      if (err) {
         res.status(500).json({ status: "failure20", err });
         return;
      }
      console.log("Ad image deleted.");
   });

   //const call = axios.delete("http://localhost:8080/api/reporting/" + adId);

   //call.status;

   client.query(
      `DELETE FROM ${addb} where "adId" = $1`,
      [adId],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure9", err });
            return;
         }
         res.status(200).json({ status: "success" });
      }
   );
};

const getAllFlights = (req, res) => {
   res.header("Content-Type", "application/json");

   client.query(`SELECT DISTINCT "flightId" FROM ${addb}`, (err, result) => {
      if (err) {
         res.status(500).json({ status: "failure11", err });
         return;
      }
      var flightIds = [];
      for (i = 0; i < result.rows.length; i++) {
         const flightId = {
            flightId: result.rows[i]["flightId"],
         };
         flightIds.push(flightId);
      }
      res.status(200).json({ status: "success", flightIds: flightIds });
   });
};

const getFlightById = (req, res) => {
   const flightId = req.params.flightId;
   client.query(
      `SELECT * FROM ${addb} WHERE "flightId" = $1`,
      [flightId],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure12", err });
            return;
         }
         var adDataObjects = [];
         for (i = 0; i < result.rows.length; i++) {
            const adDataObject = {
               adDataObject: {
                  adId: result.rows[i]["adId"],
                  adName: result.rows[i]["adName"],
                  imageLoc: result.rows[i]["imageLoc"],
                  mainText: result.rows[i]["mainText"],
                  subText: result.rows[i]["subText"],
                  linkText: result.rows[i]["linkText"],
                  linkLoc: result.rows[i]["linkLocation"],
                  height: result.rows[i]["height"],
                  width: result.rows[i]["width"],
                  flightId: result.rows[i]["flightId"],
               },
            };
            adDataObjects.push(adDataObject);
         }
         res.status(200).json({
            status: "success",
            adDataObjects: adDataObjects,
         });
      }
   );
};

module.exports = {
   storeAd,
   getInventory,
   getAd,
   updateAd,
   deleteAd,
   getAllFlights,
   getFlightById,
};
