exports.seed = function (knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('projects').truncate()
    .then(function () {
      // add data into insert
      return knex('projects').insert([
        {
          name: 'The human brain',
          due_date: '2020-07-17',
          user_id: ['1', '2', '5']
        },
        {
          name: 'Healthy habits',
          due_date: '2020-05-02',
          user_id: ['1', '3', '4']
        },
        {
          name: 'The Second World War',
          due_date: '2020-06-12',
          user_id: ['2', '3', '5']
        },
        {
          name: 'Ancient Egypt',
          due_date: '2020-05-20',
          user_id: ['2', '3', '4']
        },
        {
          name: "Artificial Inteligence",
          due_date: "2020-05-03",
          user_id: ['2', '4', '5']
        }








      ]);
    });




};