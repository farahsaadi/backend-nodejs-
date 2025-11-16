const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/create", employeeController.create);
router.get("/all", employeeController.getAll);
router.put("/update/:matricule", employeeController.update);
router.delete("/delete/:matricule", employeeController.delete);

module.exports = router;
