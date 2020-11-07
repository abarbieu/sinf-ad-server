// database calls for ad inventory
require("dotenv").config({ path: "/" });
const { Pool } = require("pg");

const pool = new Pool();

// need to set up this table
const inventoryTable = process.env.INVENTORY_TABLE || "inventory";

const storeAd = (req, res) => {};

const updateAd = (req, res) => {};

const getAd = (req, res) => {};

const getAdAtPath = (req, res) => {};
