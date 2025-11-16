const express = require("express");
const router = express.Router();
const congeController = require("../controllers/congeController");

// CRUD Congé
router.post("/create", congeController.create);
router.get("/all", congeController.getAll);
router.put("/update/:id", congeController.update);
router.delete("/delete/:id", congeController.delete);

module.exports = router;
