const express = require("express");
const router = express.Router();
const db = require("../reporting_api/reporting.js");

router.get("", db.get);
router.put("", db.createItem);

module.exports = router;
