const express = require("express");
const router = express.Router();
const db = require("../inventory_api/inventory.js");

// create ad
router.post("", db.storeAd);
// update ad
router.put("", db.updateAd);
// get ad
router.get("", db.getAd);
// delete ad
router.delete("", db.deleteAd);

module.exports = router;
