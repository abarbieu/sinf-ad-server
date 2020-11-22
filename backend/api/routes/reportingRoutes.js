const express = require("express");
const router = express.Router();
const db = require("../reporting_api/reporting.js");

// /reporting/adId
router.get("/:adId", db.getStats);
router.post("/:adId", db.createEntry);
router.put("/:adId", db.updateStats);

// /reporting/flightId
router.get("/:flightId", db.getStatsByFlightId);

module.exports = router;
