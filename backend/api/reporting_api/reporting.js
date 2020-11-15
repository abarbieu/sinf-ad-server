require("dotenv").config({ path: "../" });

const { Client } = require("pg");
var connectionString = process.env.PG_CXN;
const client = new Client({
	connectionString: connectionString,
});
client.connect();

const http = require("http");
const fs = require("fs");

const statsdb = process.env.STATSDB || "statsdb";
const addb = process.env.ADDB || "addb";

const createEntry = (req, res) => {
	res.header("Content-Type", "application/json");
	// insert
	const adName = req.params.adName;
	const flightId = req.params.flightId;

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

const refreshEntry = (req, res) => {
	const adId = req.params.adId;
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

const getStats = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;
	client.query(
		`SELECT * FROM ${statsdb} WHERE adId = $1`,
		[adId],
		(err, res) => {
			if (err) {
				res.status(500).json({ status: "failure", err });
				return;
			}
			// export to csv
			var jsonOutput = {
				adId: adId,
				adName: res.params.adName,
				flightId: res.params.flightId,
				impressions: res.params.impressions,
				clicks: res.params.clicks,
				conversions: res.params.conversions,
			};
			const csvOutput = fs.createWriteStream(
				res.params.adName + res.params.flightId + ".csv"
			);
			const request = http.get();
		}
	);
};

const deleteStats = (req, res) => {
	res.header("Content-Type", "application/json");
	const adId = req.params.adId;
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

const updateStats = (req, res) => {};
module.exports = {
	createEntry,
	getStats,
	refreshEntry,
	deleteStats,
	updateStats,
};
