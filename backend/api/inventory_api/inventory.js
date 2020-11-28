require("dotenv").config({ path: "../" });

const fs = require("fs");
const http = require("http");
const { Client } = require("pg");
var connectionString = process.env.PG_CXN;
const client = new Client({
	connectionString: connectionString,
});
client.connect();

const addb = process.env.ADDB || "addb";
const statsdb = process.env.STATSDB || "statsdb";

const storeAd = (req, res) => {
	res.header("Content-Type", "application/json");
	const image = req.body.image;
	const adName = req.body.adDataObject.adName;
	const mainText = req.body.adDataObject.mainText;
	const subText = req.body.adDataObject.subText;
	const linkText = req.body.adDataObject.linkText;
	const linkLoc = req.body.adDataObject.linkLoc;
	console.log("adDataObject: ", req.body.adDataObject);
	const width = req.body.adDataObject.width;
	const height = req.body.adDataObject.height;
	const flightId = req.body.adDataObject.flightId;
	const imageLoc = __dirname + "/images/" + adName;
	console.log(imageLoc);
	fs.writeFile(imageLoc, image, function (err) {
		if (err) {
			res.status(500).json({ status: "failure1", req });
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
		}
	);
	// replace with axios call later
	// client.query(
	// 	`INSERT INTO VALUES ${statsdb} ($1, $2, $3, 0, 0, 0)`,
	// 	[adId, adName, flightId],
	// 	(err, result) => {
	// 		if (err) {
	// 			res.status(500).json({ status: "failure2", err });
	// 			return;
	// 		}
	// 		res.status(200).json({ status: "success", adObjectData });
	// 	}
	// );

	// client.query(
	// 	`SELECT adId from addb where adName = $1`,
	// 	[adName],
	// 	(err, res) => {
	// 		if (err) {
	// 			res.status(500).json({ status: "failure", err });
	// 			return;
	// 		}
	// 		const adId = res.params.adId;
	// 		// make entry in statsdb under the same adId
	// 		client.query(
	// 			`INSERT INTO VALUES ${statsdb} ($1, $2, $3, 0, 0, 0)`,
	// 			[adId],
	// 			[adName],
	// 			[flightId],
	// 			(err, res) => {
	// 				if (err) {
	// 					res.status(500).json({ status: "failure", err });
	// 					return;
	// 				}
	// 				res.status(200).json({ status: "success", adObjectData });
	// 			}
	// 		);
	// 	}
	// );
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
		res.status(200).json({ status: "success", result: result.rows });
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
	const imageLoc = __dirname + "/images/" + adName;
	const image = req.body.image;

	fs.writeFile(imageLoc, image, function (err) {
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

	// replace with axios call
	// client.query(
	// 	`UPDATE ${statsdb} SET "impressions" = 0, "conversions" = 0, "clicks" = 0 WHERE ("adId" = $1)`,
	// 	[adId],
	// 	(err, res) => {
	// 		if (err) {
	// 			res.status(500).json({ status: "failure7", err });
	// 			return;
	// 		}
	// 		res.status(200).json({ status: "success", adObjectData });
	// 	}
	// );
};

const getAd = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;

	client.query(
		`SELECT * FROM ${addb} where "adId" = $1`,
		[adId],
		(err, res3) => {
			if (err) {
				res.status(500).json({ status: "failure8", err });
				return;
			}
			const adObjectData = res3.rows;
			res.status(200).json({ status: "success", result: adObjectData });
			// const imageLoc = req.body.adDataObject.imageLoc;
			// const adObjectData = res3.body;
			// http
			// 	.createServer(function (req, res2) {
			// 		fs.readFile(imageLoc, function (err, data) {
			// 			res2.writeHead(200, { "Content-Type": "text/html" });
			// 			res2.write(data);
			// 			res2.write(adObjectData);
			// 			return res2.end();
			// 		});
			// 	})
			// 	.listen(8080);
		}
	);
};

const deleteAd = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;
	const imageLoc = __dirname + "/images/" + req.body.adName;
	fs.unlink(imageLoc, function (err) {
		if (err) {
			throw err;
		}
		console.log("Ad image deleted.");
	});

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
	// axios
	// client.query(
	// 	`DELETE FROM ${statsdb} where "adId" = $1`,
	// 	[adId],
	// 	(err, result) => {
	// 		if (err) {
	// 			res.status(500).json({ status: "failure10", err });
	// 			return;
	// 		}
	// 		res.status(200).json({ status: "success" });
	// 	}
	// );
};

const getAllFlights = (req, res) => {
	res.header("Content-Type", "application/json");

	client.query(`SELECT DISTINCT "flightId" FROM ${addb}`, (err, result) => {
		if (err) {
			res.status(500).json({ status: "failure11", err });
			return;
		}
		res.status(200), json({ status: "success", result });
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
			res.status(200), json({ status: "success", result });
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
