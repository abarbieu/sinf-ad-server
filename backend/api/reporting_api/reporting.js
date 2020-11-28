require("dotenv").config({ path: "../" });

const { Client } = require("pg");
var connectionString = process.env.PG_CXN;
const client = new Client({
	connectionString: connectionString,
});
client.connect();

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
			// export to csv
			// var jsonOutput = {
			// 	adId: adId,
			// 	adName: res2.body.adName,
			// 	flightId: res2.body.flightId,
			// 	impressions: res2.body.impressions,
			// 	clicks: res2.body.clicks,
			// 	conversions: res2.body.conversions,
			// };
			res.status(200).json({ status: "success", result: res2.rows });
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

const getStatsByFlightId = (req, res) => {};

module.exports = {
	createEntry,
	getStats,
	updateStats,
	getStatsByFlightId,
	deleteStats,
};
