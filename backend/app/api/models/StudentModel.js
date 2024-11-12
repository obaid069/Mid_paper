const knex = require("../../knex");

class StudentModel {
  async insertOne(fields) {
    let birthday = fields.birthday.split("/");
    birthday = birthday[2] + "-" + birthday[1] + "-" + birthday[0];
    const result = await knex.raw(`
      INSERT INTO Student (name, birthday, gender)
      VALUES ("${fields.name}", "${birthday}", "${fields.gender}");
    `);
    return result[0].insertId;
  }

  async selectAll() {
    const result = await knex.raw(`
      SELECT * from Student;
    `);
    return result[0];
  }

  async selectById(id) {
    const result = await knex.raw(`
      SELECT * from Student WHERE id = ${id};
    `);
    return result[0][0];
  }

  async selectByClass(classId) {
    const result = await knex.raw(`
      SELECT * FROM Student AS s INNER JOIN Class_has_Student AS chs ON s.id = chs.Student_id WHERE chs.Class_id = ${classId};
    `);
    return result[0];
  }

  async updateById(id, fields) {
    let birthday = fields.birthday.split("/");
    birthday = birthday[2] + "-" + birthday[1] + "-" + birthday[0];
    const result = await knex.raw(`
      UPDATE Student
      SET name = "${fields.name}", birthday = "${birthday}", gender = "${fields.gender}"
      WHERE id = ${id};
    `);
    return result[0].affectedRows;
  }

  async deleteById(id) {
    const result = await knex.raw(`
      DELETE FROM Student WHERE id = ${id};
    `);
    return result[0].affectedRows;
  }

  async registerToClass(fields) {
    const result = await knex.raw(`
      INSERT INTO Class_has_Student (Class_id, Student_id)
      VALUES ("${fields.Class_id}", "${fields.Student_id}");
    `);
    return result[0].affectedRows;
  }

  async unregisterToClass(studentId, classId) {
    const result = await knex.raw(`
      DELETE FROM Class_has_Student WHERE Class_id = ${classId} AND Student_id = ${studentId};
    `);
    return result[0].affectedRows;
  }
}

module.exports = new StudentModel();
