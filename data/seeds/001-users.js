exports.seed = function(knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  //return knex('users').truncate()
  //  .then(function () {
      // add data into insert
      return knex('users').insert([

        {
          username: 'patrick',
          password:'abc123',
          name:"Patrick O'Connor",
          role:'mentor',
          email_address:'pat@gmail.com'

        },
        {
          username: 'rick',
          password:'abc123',
          name:'Richard Coleman',
          role:'student',
          email_address:'rick@gmail.com'

        },
        {
          username: 'mary',
          password:'abc123',
          name:'Mary Smith',
          role:'student',
          email_address:'mary@gmail.com'

        },
        {
          username: 'dan',
          password:'abc123',
          name:'Daniel Layman',
          role:'student',
          email_address:'dan@gmail.com'

        },
        {
          username: 'steph',
          password:'abc123',
          name:'Stephanie Crook',
          role:'student',
          email_address:'steph@gmail.com'

        },

      ]);
    });




};
