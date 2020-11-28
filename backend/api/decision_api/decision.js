require("dotenv").config({ path: "../" });

const { Client } = require("pg");
var connectionString = process.env.PG_CXN;
const client = new Client({
	connectionString: connectionString,
});
client.connect();

const addb = process.env.ADDB || "addb";


const getAdByFlight = (req, res) => {
    const flightId = req.body.flightId;
    const zoneSize = req.body.zoneSize;
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
						linkLoc: result.rows[i]["linkLoc"],
						height: result.rows[i]["height"],
						width: result.rows[i]["width"],
						flightId: result.rows[i]["flightId"],
					},
				};
				adDataObjects.push(adDataObject);
			}
			res.status(200).json({ status: "success", adDataObjects: adDataObjects });
		}
	);
};


module.exports = {
	getAdByFlight,
};