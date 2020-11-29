const express = require("express");
const router = express.Router();
const db = require("../reporting_api/reporting.js");

// /reporting/{adId}
router.get("/:adId", db.getStats);
router.post("/:adId", db.createEntry);
router.put("/:adId", db.updateStats);
router.delete("/:adId", db.deleteStats);

// /reporting/flights/{flightId}
router.get("/flights/:flightId", db.getStatsByFlightId);
router.get("/sum/:flightId", db.getSummedStats);

module.exports = router;
