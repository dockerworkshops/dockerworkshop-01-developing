exports.up = knex =>
  knex.schema.createTable('sentiment_scores', (table) => {
    table.increments('sentiment_score_id').primary();
    table
      .string('channel_id')
      .notNullable()
      .references('channel_id')
      .inTable('channels')
      .onDelete('cascade')
      .index();
    table.decimal('score', 3, 2).notNullable();
    table.float('magnitude').notNullable();
    table.integer('number_of_messages').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('sentiment_scores');
