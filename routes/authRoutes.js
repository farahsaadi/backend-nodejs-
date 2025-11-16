const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/all", authController.getAll);
router.delete("/delete/:id", authController.delete);

module.exports = router;
