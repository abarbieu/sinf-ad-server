const express = require("express");
const router = express.Router();
const db = require("../notes/queries.js");
const logger = require("../middleware/logger.js");

router.get("/allowed", (req, res) => {
   console.log(logger.getIP(req));
   const reqIP = logger.getIP(req);
   if (
      reqIP === "38.142.236.234" ||
      reqIP === "192.168.4.41" ||
      reqIP === "68.6.89.27" ||
      reqIP === "66.215.121.164" ||
      reqIP === "162.247.60.1" ||
      reqIP === "1"
   ) {
      res.status(200).send(true);
   } else {
      res.status(403).send(false);
   }
});
router.get("/", db.getNotes);
router.get("/:id", db.getNoteById);
router.post("/", db.createNote);
router.put("/:id", db.updateNote);
router.delete("/:id", db.deleteNote);

module.exports = router;
