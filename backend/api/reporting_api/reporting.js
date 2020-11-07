require("dotenv").config({ path: "../" });
console.log(process.env)
const { Pool } = require("pg");

const pool = new Pool();

const stats_table = process.env.STATS_TABLE || "stats_table";
const airlines = process.env.AIRLINES || "airlines";

const get = (req, res) => {
	res.header("Content-Type", "application/json");
	pool.query(`SELECT * FROM ${airlines}`, (err, result) => {
		if (err) {
			res.status(500).json({ err });
			return;
		} else {
			res.status(200).send(result);
			return;
		}
	});
};

const createItem = (req, res) => {
	res.header("Content-Type", "application/json");

	pool.query(
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
