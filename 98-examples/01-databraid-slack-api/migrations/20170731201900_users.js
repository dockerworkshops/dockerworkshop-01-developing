exports.up = knex => knex.schema.createTable('users', (table) => {
  table.string('user_id', 255).primary();
  table.string('user_name', 255).notNullable();
  table.string('real_name', 255);
  table.string('first_name', 255);
  table.string('last_name', 255);
  table.string('status_emoji', 255);
  table.string('image_24', 255);
  table.string('image_512', 255);
});

exports.down = knex => knex.schema.dropTable('users');
