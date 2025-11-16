const express = require("express");
const router = express.Router();

const materielController = require("../controllers/materielController");

// CRUD matériel
router.post("/create", materielController.create);
router.get("/all", materielController.getAll);
router.put("/update/:id", materielController.update);
router.delete("/delete/:id", materielController.delete);

module.exports = router;
