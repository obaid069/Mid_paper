const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/TeacherController");

router.get("/all", TeacherController.getAll);
router.put("/", TeacherController.insert);
router.get("/:id", TeacherController.getById);
router.post("/:id", TeacherController.update);
router.delete("/:id", TeacherController.delete);

module.exports = router;
