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
	const adId = req.params.adId;
	const { adName, flightId } = req.body;
	// make entry in statsdb under the same adId
	client.query(
		`INSERT INTO ${statsdb} VALUES ($1, 'test', 'test', 0, 0, 0)`,
		[adId],
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
		[adId],
		[impressions],
		[clicks],
		[conversions],
		(err, res) => {
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
			// export to csv
			var jsonOutput = {
				adId: adId,
				adName: res.params.adName,
				flightId: res.params.flightId,
				impressions: res.params.impressions,
				clicks: res.params.clicks,
				conversions: res.params.conversions,
			};
			res.status(200).json({ status: "success", jsonOutput });
		}
	);
};

const getStatsByFlightId = (req, res) => {};

module.exports = {
	createEntry,
	getStats,
	updateStats,
	getStatsByFlightId,
};
