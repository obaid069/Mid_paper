const knex = require("../../knex");

class TeacherModel {
  async insertOne(fields) {
    const result = await knex.raw( `
      INSERT INTO Teacher (name, email, gender)
      VALUES ("${fields.name}", "${fields.email}", "${fields.gender}");
    `);
    return result[0].insertId;
  }

  async selectAll() {
    const result = await knex.raw(`
      SELECT * from Teacher;
    `);
    return result[0];
  }

  async selectById(id) {
    const result = await knex.raw(`
      SELECT * from Teacher WHERE id = ${id};
    `);
    return result[0][0];
  }

  async updateById(id, fields) {
    const result = await knex.raw(`
      UPDATE Teacher
      SET name = "${fields.name}", email = "${fields.email}", gender = "${fields.gender}"
      WHERE id = ${id};
    `);
    return result[0].affectedRows;
  }

  async deleteById(id) {
    const result = await knex.raw(`
      DELETE FROM Teacher WHERE id = ${id};
    `);
    return result[0].affectedRows;
  }
}

module.exports = new TeacherModel();
