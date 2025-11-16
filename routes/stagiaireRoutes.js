const express = require("express");
const router = express.Router();
const stagiaireController = require("../controllers/stagiaireController");

router.post("/create", stagiaireController.create);
router.get("/all", stagiaireController.getAll);
router.put("/update/:id", stagiaireController.update);
router.delete("/delete/:id", stagiaireController.delete);

module.exports = router;
