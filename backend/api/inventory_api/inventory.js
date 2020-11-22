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
	console.log("here");
	res.header("Content-Type", "application/json");
	res.status(200).json({ status: "test" });
	const image = req.body.image;
	const adName = req.body.adDataObject.adName;
	const mainText = req.body.adDataObject.mainText;
	const subText = req.body.adDataObject.subText;
	const linkText = req.body.adDataObject.linkText;
	const linkLoc = req.body.adDataObject.linkLoc;
	const width = req.body.adDataObject.width;
	const height = req.body.adDataObject.height;
	const flightId = req.body.adDataObject.flightId;
	const imageLoc = adName + flightId + ".jpg";

	fs.writeFile(imageLoc, image, function (err) {
		if (err) {
			res.status(500).json({ status: "failure", req });
			return;
		}
		console.log("Ad image saved.");
	});

	const adObjectData = 0;

	client.query(
		`INSERT INTO ${addb} VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		[adName],
		[imageLoc],
		[mainText],
		[subText],
		[linkText],
		[linkLoc],
		[width],
		[height],
		[flightId],
		(err, result) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
				return;
			} else {
				adObjectData = result;
				console.log("Ad images inserted into addb");
			}
		}
	);

	// get ad id from addb
	client.query(
		`SELECT adId from addb where adName = $1`,
		[adName],
		(err, res) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
				return;
			}
			const adId = res.params.adId;
			// make entry in statsdb under the same adId
			client.query(
				`INSERT INTO VALUES ${statsdb} ($1, $2, $3, 0, 0, 0)`,
				[adId],
				[adName],
				[flightId],
				(err, res) => {
					if (err) {
						res.status(500).json({ status: "failure", err });
						return;
					}
					res.status(200).json({ status: "success", adObjectData });
				}
			);
		}
	);
};

const getInventory = (req, res) => {
	res.header("Content-Type", "application/json");

	client.query(`SELECT * FROM ${addb}`, (err, result) => {
		if (err) {
			res.status(500).json({ status: "failure", err });
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
	const imageLoc = adName + flightId + ".jpg";

	fs.writeFile(imageLoc, image, function (err) {
		if (err) {
			throw err;
		}
		console.log("Ad image saved.");
	});

	const adObjectData = 0;

	client.query(
		`UPDATE ${addb}
SET adName = $2, imageLoc = $3,  mainText = $4, subText = $5, linkText = $6, linkLoc = $7, dimensions = $8, flightId = $9
WHERE (adId = $1)`,
		[adId],
		[adName],
		[imageLoc],
		[mainText],
		[subText],
		[linkText],
		[linkLoc],
		[width],
		[height],
		[flightId],
		(err, result) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
				return;
			}
			adObjectData = result;
			console.log("Ad image updated.");
		}
	);

	client.query(
		`UPDATE ${statsdb} SET impressions = 0, conversions = 0, clicks = 0 WHERE (adId = $1)`,
		[adId],
		(err, res) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
				return;
			}
			res.status(200).json({ status: "success", adObjectData });
		}
	);
};

const getAd = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;

	client.query(`SELECT * FROM ${addb} where adId = $1`, [adId], (err, res3) => {
		if ((err, res3)) {
			res.status(500).json({ status: "failure", err });
		}
		const imageLoc = res3.body.adDataObject.imageLoc;
		const adObjectData = res3.body;
		http
			.createServer(function (req, res2) {
				fs.readFile(imageLoc, function (err, data) {
					res2.writeHead(200, { "Content-Type": "text/html" });
					res2.write(data);
					res2.write(adObjectData);
					return res2.end();
				});
			})
			.listen(8080);
	});
};

const deleteAd = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;
	const imageLoc = req.body.adDataObject.imageLoc;
	fs.unlink(imageLoc, function (err) {
		if (err) {
			throw err;
		}
		console.log("Ad image deleted.");
	});

	client.query(`DELETE FROM ${addb} where adId = $1`, [adId], (err, result) => {
		if (err) {
			res.status(500).json({ status: "failure", err });
			return;
		}
		res.status(200).json({ status: "success" });
	});
};

const getAllFlights = (req, res) => {
	res.header("Content-Type", "application/json");

	client.query(`SELECT DISTINCT flightId FROM ${addb}`, (err, result) => {
		if (err) {
			res.status(500).json({ status: "failure", err });
			return;
		}
		res.status(200), json({ status: "success", result });
	});
};

const getFlightById = (req, res) => {
	const flightId = req.params.flightId;
	client.query(
		`SELECT * FROM ${addb} WHERE flightId = $1`,
		[flightId],
		(err, result) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
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
