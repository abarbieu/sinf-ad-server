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
	const adName = req.body.adName;
	const mainText = req.body.mainText;
	const subText = req.body.subText;
	const linkText = req.body.linkText;
	const linkLocation = req.body.linkLocation;
	const width = req.body.width;
	const height = req.body.height;
	const flightId = req.body.flightId;
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
		`INSERT INTO ${addb} ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		[adName],
		[imageLoc],
		[mainText],
		[subText],
		[linkText],
		[linkLocation],
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
				`INSERT INTO ${statsdb} ($1, $2, $3, 0, 0, 0)`,
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

const getInventory = (req, res) => {};

const updateAd = (req, res) => {
	res.header("Content-Type", "application/json");

	const adId = req.params.adId;
	const adName = req.body.adName;
	const mainText = req.body.mainText;
	const subText = req.body.subText;
	const linkText = req.body.linkText;
	const linkLocation = req.body.linkLocation;
	const width = req.body.width;
	const height = req.body.height;
	const flightId = req.body.flightId;
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
SET adName = $2, imageLoc = $3,  mainText = $4, subText = $5, linkText = $6, linkLocation = $7, dimensions = $8, flightId = $9
WHERE (adId = $1)`,
		[adId],
		[adName],
		[imageLoc],
		[mainText],
		[subText],
		[linkText],
		[linkLocation],
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

	client.query(`SELECT * FROM ${addb} where adId = $1`, [adId], (err, res) => {
		if (err) {
			res.status(500).json({ status: "failure", err });
		}
		const imageLoc = res.body.imageLoc;
		const adObjectData = res;
		http
			.createServer(function (req, res) {
				fs.readFile(imageLoc, function (err, data) {
					res.writeHead(200, { "Content-Type": "text/html" });
					res.write(data);
					res.write(adObjectData);
					return res.end();
				});
			})
			.listen(8080);
	});
};

const deleteAd = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;
	const imageLoc = req.body.imageLoc;
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
		console.log("Ad deleted from addb");
	});

	client.query(
		`DELETE from ${statsdb} WHERE (adId = $1)`,
		[adId],
		(err, res) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
				return;
			}
			console.log("Ad deleted from addb");
			res.status(200).json({ status: "success" });
		}
	);
};

const getAllFlights = (req, res) => {};

const createFlight = (req, res) => {};

const getFlightById = (req, res) => {};

module.exports = {
	storeAd,
	getInventory,
	getAd,
	updateAd,
	deleteAd,
	getAllFlights,
	createFlight,
	getFlightById,
};
