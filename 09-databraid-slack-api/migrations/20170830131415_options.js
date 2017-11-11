exports.up = knex => knex.schema.createTable('options', (table) => {
  table.string('option_name', 255).primary();
  table.string('option_value', 255);
});

exports.down = knex => knex.schema.dropTable('options');
