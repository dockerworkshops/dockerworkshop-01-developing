exports.up = knex => knex.schema.createTable('channels', (table) => {
  table.string('channel_id', 255).primary();
  table.string('channel_name', 255);
});

exports.down = knex => knex.schema.dropTable('channels');
