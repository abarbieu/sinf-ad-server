require("dotenv").config({ path: "../" });

const { Client } = require("pg");

var connectionString = process.env.PG_CXN;

const client = new Client({
	connectionString: connectionString,
});

client.connect();

const stats_table = process.env.STATS_TABLE || "stats_table";
const airlines = process.env.AIRLINES || "airlines";

const get = (req, res) => {
	res.header("Content-Type", "application/json");
	console.log("getting me");
	client.query(`SELECT * FROM airlines`, (err, result) => {
		console.log("query");
		if (err) {
			console.log(err);
			res.status(400).send(err);
			return;
		} else {
			console.log("success");
			res.status(200).send(result.rows);
			return;
		}
	});
};

const createItem = (req, res) => {
	res.header("Content-Type", "application/json");

	client.query(
		`INSERT INTO ${airlines} (Id, Airline,  Abbreviation, Country) VALUES (1 , 'United Airlines', 'UAL', 'USA')`,
		(err, result) => {
			if (err) {
				res.status(500).json({ err });
				return;
			} else {
				res.status(200).send(result);
			}
		}
	);
};
module.exports = { createItem, get };
