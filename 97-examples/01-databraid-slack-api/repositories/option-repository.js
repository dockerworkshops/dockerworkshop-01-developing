const knex = require('../knex.js');

function getOption(name) {
  return knex('options')
    .where({ option_name: name })
    .select('option_value')
    .first()
    .then((result) => {
      if (!result) {
        return null;
      }
      return result.option_value;
    })
    .catch(err => err);
}

function setOption(name, value) {
  return knex('options')
    .where({ option_name: name })
    .del()
    .then(() => knex('options').insert({ option_name: name, option_value: value }, '*'))
    .catch(err => err);
}

module.exports = { getOption, setOption };
