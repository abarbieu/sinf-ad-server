const express = require("express");
const router = express.Router();
const db = require("../reporting_api/reporting.js");

router.get("", db.getStats);
router.post("", db.createEntry);
router.put("", db.updateStats);
router.put("", db.refreshEntry);
router.delete("", db.deleteStats);

module.exports = router;
