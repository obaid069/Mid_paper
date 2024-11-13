const knex = require("../../knex");

class ClassModel {
  async insertOne(fields) {
    let query = `
      INSERT INTO Class (level, Teacher_id)
      VALUES ("${fields.level}", "${fields.Teacher_id}");
    `;
    if (!fields.Teacher_id) {
      query = `
        INSERT INTO Class (level)
        VALUES ("${fields.level}");
      `
    }
    const result = await knex.raw(query);
    return result[0].insertId;
  }

  async selectAll() {
    const result = await knex.raw(`
      SELECT c.id, c.level, t.name AS 'teacher_name' FROM Class AS c LEFT JOIN Teacher AS t ON c.Teacher_id = t.id;
    `);
    return result[0];
  }

  async selectById(id) {
    const result = await knex.raw(`
      SELECT * from Class WHERE id = ${id};
    `);
    return result[0][0];
  }

  async updateById(id, fields) {
    let query = `
      UPDATE Class
      SET level = "${fields.level}", Teacher_id = "${fields.Teacher_id}"
      WHERE id = ${id};
    `;
    if (!fields.Teacher_id) {
      query = `
        UPDATE Class
        SET level = "${fields.level}"
        WHERE id = ${id};
      `;
    }
    const result = await knex.raw(query);
    return result[0].affectedRows;
  }

  async deleteById(id) {
    const result = await knex.raw(`
      DELETE FROM Class WHERE id = ${id};
    `);
    return result[0].affectedRows;
  }
}

module.exports = new ClassModel();
