exports.up = knex =>
  knex.schema.createTable('messages', (table) => {
    table.increments('message_id').primary();
    table
      .string('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('cascade')
      .index();
    table
      .string('channel_id')
      .notNullable()
      .references('channel_id')
      .inTable('channels')
      .onDelete('cascade')
      .index();
    table.string('raw_ts', 20).notNullable();
    table.dateTime('message_timestamp').notNullable();
    table.text('message').notNullable().defaultTo('');
  });

exports.down = knex => knex.schema.dropTable('messages');
