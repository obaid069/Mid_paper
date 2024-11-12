const Student = require("../models/StudentModel");

class StudentController {
  getAll(req, res, next) {
    Student.selectAll()
      .then((students) => res.json(students))
      .catch(next);
  }

  insert(req, res, next) {
    Student.insertOne(req.body)
      .then((studentId) => res.json(studentId))
      .catch(next);
  }

  getById(req, res, next) {
    Student.selectById(req.params.id)
      .then((student) => res.json(student))
      .catch(next);
  }

  getByClass(req, res, next) {
    Student.selectByClass(req.params.classId)
    .then((students) => res.json(students))
    .catch(next);
  }

  update(req, res, next) {
    Student.updateById(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch(next);
  }

  delete(req, res, next) {
    Student.deleteById(req.params.id)
      .then((result) => res.json(result))
      .catch(next);
  }

  registerToClass(req, res, next) {
    Student.registerToClass(req.body)
      .then((result) => res.json(result))
      .catch(next);
  }

  unregisterFromClass(req, res, next) {
    Student.unregisterToClass(req.params.studentId, req.params.classId)
      .then((result) => res.json(result))
      .catch(next);
  }
}

module.exports = new StudentController();
