const express = require("express");
const router = express.Router();
const reunionController = require("../controllers/reunionController");

router.post("/create", reunionController.create);
router.get("/all", reunionController.getAll);
router.put("/update/:id", reunionController.update);
router.delete("/delete/:id", reunionController.delete);

module.exports = router;
