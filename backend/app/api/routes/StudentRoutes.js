const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

router.get("/all", StudentController.getAll);
router.put("/", StudentController.insert);
router.get("/:id", StudentController.getById);
router.get("/by-class/:classId", StudentController.getByClass);
router.put("/register-to-class", StudentController.registerToClass);
router.delete("/unregister-from-class/:studentId/:classId", StudentController.unregisterFromClass);
router.post("/:id", StudentController.update);
router.delete("/:id", StudentController.delete);

module.exports = router;
