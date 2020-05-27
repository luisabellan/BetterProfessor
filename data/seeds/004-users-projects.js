exports.seed = function (knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('users_projects').truncate()
    .then(function () {
      // add data into insert
      return knex('users_projects').insert([
        {
          project_id: 1,
          user_id: [1,2.3],
        },
        {
          project_id: 2,
          user_id: [1],
        },
        {
          project_id: 3,
          user_id: [5],
        },
        {
          project_id: 4,
          user_id: [4],
        },
        {
          project_id: 5,
          user_id: [2],
        },


      ]);
    });




};