const Teacher = require("../models/TeacherModel");

class TeacherController {
  getAll(req, res, next) {
    Teacher.selectAll()
      .then((teachers) => res.json(teachers))
      .catch(next);
  }

  insert(req, res, next) {
    Teacher.insertOne(req.body)
      .then((teacherId) => res.json(teacherId))
      .catch(next);
  }

  getById(req, res, next) {
    Teacher.selectById(req.params.id)
      .then((teacher) => res.json(teacher))
      .catch(next);
  }

  update(req, res, next) {
    Teacher.updateById(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch(next);
  }

  delete(req, res, next) {
    Teacher.deleteById(req.params.id)
      .then((result) => res.json(result))
      .catch(next);
  }
}

module.exports = new TeacherController();