const express = require("express");
const router = express.Router();
const invitationController = require("../controllers/invitationController");

router.post("/create", invitationController.create);
router.get("/all", invitationController.getAll);
router.delete("/delete/:id", invitationController.delete);

module.exports = router;
