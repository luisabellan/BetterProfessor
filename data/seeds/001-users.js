exports.seed = function(knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('users').truncate()
    .then(function () {
      // add data into insert
      return knex('users').insert([
        { 
          username: 'rick',
          password:'abc123',
          name:'Richard Coleman',
          email_address:'rick@gmail.com'

        },
        { 
          username: 'mary',
          password:'abc123',
          name:'Mary Smith',
          email_address:'mary@gmail.com'

        },
        { 
          username: 'dan',
          password:'abc123',
          name:'Daniel Layman',
          email_address:'dan@gmail.com'

        },
        { 
          username: 'steph',
          password:'abc123',
          name:'Stephanie Crook',
          email_address:'steph@gmail.com'

        },
       
      ]);
    });
  
  
  
  
};