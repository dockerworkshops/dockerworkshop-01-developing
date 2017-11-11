exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          username: 'Django',
          secret: 'The D is silent.',
          // plain text password is 'django'
          password: '$2a$10$Q.KnTrs8rX/hgiL1R2b5HuoTR3zahSIV0GBxEQuXEhiMpigyKoBqm'
        },
        {
          id: 2,
          username: 'GraceLeeBoggs',
          secret: "Love isn't about what we did yesterday.",
          // plain text password is 'graceleeboggs'
          password: '$2a$10$v61gohESSxwWvLijLRVinOJK/5QKiDB8gEionuWMTRsvmGe0FkA0W'
        },
        {
          id: 3,
          username: 'Rowan',
          secret: "I don't know you're not me.",
          // plain text password is 'rowan'
          password: '$2a$10$DUMQmtEgNtOCDjAFtKtBBOSWyGM.UMDCEtbefa/ASyYOdAggRzFk6'
        }
      ]);
    });
};
