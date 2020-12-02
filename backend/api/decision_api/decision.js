require("dotenv").config({ path: "../" });

const { Client } = require("pg");

var connectionString = process.env.PG_CXN;
const client = new Client({
   connectionString: connectionString,
});
client.connect();

const addb = process.env.ADDB || "addb";

const getAdByFlight = (req, res) => {
   const deviceType = req.query.deviceType;
   const zoneSize = req.query.zoneSize;
   var flightId = 0;
   if (deviceType === "Mobile") {
      flightId = 1;
   } else if (deviceType === "Desktop") {
      flightId = 2;
   }
   console.log(flightId);
   console.log(zoneSize);
   client.query(
      `SELECT * FROM ${addb} WHERE "flightId" = $1 AND ("width" * "height") <= $2`,
      [flightId, zoneSize],
      (err, result) => {
         if (err) {
            res.status(500).json({ status: "failure12", err });
            return;
         }
         console.log(result.rows);
         console.log("\n");
         if (result.rowCount == 0) {
            res.status(500).json({
               status: "failure",
               err:
                  "There is no ad that corresponds to the flightId and zoneSize provided.",
            });
            return;
         }
         const randInt = getRndInteger(0, result.rows.length - 1);
         const adDataObject = {
            adId: result.rows[randInt]["adId"],
            adName: result.rows[randInt]["adName"],
            imageLoc: result.rows[randInt]["imageLoc"],
            mainText: result.rows[randInt]["mainText"],
            subText: result.rows[randInt]["subText"],
            linkText: result.rows[randInt]["linkText"],
            linkLoc: result.rows[randInt]["linkLoc"],
            height: result.rows[randInt]["height"],
            width: result.rows[randInt]["width"],
            flightId: result.rows[randInt]["flightId"],
         };
         res.status(200).json({
            status: "success",
            adDataObject: adDataObject,
         });
      }
   );
};
function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
   getAdByFlight,
};
