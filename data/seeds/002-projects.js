exports.seed = function (knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
   return knex('projects').del()
     .then(function () {
      // add data into insert
      return knex('projects').insert([
        {
          name: 'The human brain',
          due_date: '2020-07-17',
        },
        {
          name: 'Healthy habits',
          due_date: '2020-05-02',
        },
        {
          name: 'The Second World War',
          due_date: '2020-06-12',
        },
        {
          name: 'Ancient Egypt',
          due_date: '2020-05-20',
        },
        {
          name: "Artificial Inteligence",
          due_date: "2020-05-03",
        }
      ]
      )
      }
    )
  }
