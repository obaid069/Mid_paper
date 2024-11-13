const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

router.get("/all", ClassController.getAll);
router.get("/:id", ClassController.getById);
router.put("/", ClassController.insert);
router.post("/:id", ClassController.update);
router.delete("/:id", ClassController.delete);

module.exports = router;
