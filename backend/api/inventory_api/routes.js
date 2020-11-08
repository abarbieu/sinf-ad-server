// routing for inventory api
const express = require("express");
const router = express.Router();
const db = require("inventory.js");

// store ad
router.put("", db.storeAd);
// update ad
router.post("", db.updateAd);
// get ad by name
router.get("/:adName", db.getAdByName);
// get ad at different path
router.get("/:path", db.getAdAtPath);

module.exports = router;
