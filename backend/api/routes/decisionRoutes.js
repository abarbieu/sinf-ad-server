const express = require("express");
const router = express.Router();
const db = require("../decision_api/decision.js");

router.get("", db.getAdByFlight);


module.exports = router;
