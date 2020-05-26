exports.seed = function(knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('projects').truncate()
    .then(function () {
      // add data into insert
      return knex('projects').insert([
        {
          name: 'The human brain',
          due_date: '2020-07-17',
          users_ids: ['1','3','5']
        },
        {
          name: 'Healthy habits',
          due_date: '2020-05-02',
          users_ids: ['2','3','4']        },
        {
          name: 'The Second World War',
          due_date: '2020-06-12',
          users_ids: ['1','2','3']
        },
        {
          name: 'Ancient Egypt',
          due_date: '2020-05-20',
          users_ids: ['3','4','5']
        },
        {
          name: "Artificial Inteligence",
          due_date: "2020-05-03",
          users_ids: ['1','3','4']
        }
    
        
        

         



      ]);
    });
  
  
  
  
};