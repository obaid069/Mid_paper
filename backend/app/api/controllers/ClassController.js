const Class = require("../models/ClassModel");

class ClassController {
  getAll(req, res, next) {
    Class.selectAll()
      .then((classes) => res.json(classes))
      .catch(next);
  }

  insert(req, res, next) {
    Class.insertOne(req.body)
      .then((classId) => res.json(classId))
      .catch(next);
  }

  getById(req, res, next) {
    Class.selectById(req.params.id)
      .then((c) => res.json(c))
      .catch(next);
  }

  update(req, res, next) {
    Class.updateById(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch(next);
  }

  delete(req, res, next) {
    Class.deleteById(req.params.id)
      .then((result) => res.json(result))
      .catch(next);
  }
}

module.exports = new ClassController();
