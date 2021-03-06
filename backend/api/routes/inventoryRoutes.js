const express = require("express");
const router = express.Router();
const db = require("../inventory_api/inventory.js");

// /inventory
router.post("", db.storeAd);
router.get("", db.getInventory);

// /inventory/flights
router.get("/flights", db.getAllFlights);
router.get("/flights/:flightId", db.getFlightById);

// /inventory/{adId}
router.get("/:adId", db.getAd);
router.put("/:adId", db.updateAd);
router.delete("/:adId", db.deleteAd);

module.exports = router;
