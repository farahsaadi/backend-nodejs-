const express = require("express");
const router = express.Router();
const actualiteController = require("../controllers/actualiteController");

router.post("/create", actualiteController.create);
router.get("/all", actualiteController.getAll);
router.put("/update/:id", actualiteController.update);
router.delete("/delete/:id", actualiteController.delete);

module.exports = router;
