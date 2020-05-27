exports.seed = function (knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex("reminders")
    .truncate()
    .then(function () {
      // add data into insert
      return knex("reminders").insert([
        {
          message: "exam next monday",
          send_date: "2016-03-07",
          time:"08:00:00"  
        },
        {
          message: "bring your dictionary",
          send_date: "2016-03-07",
          time:"08:00:00"  
        },
        {
          message: "did you copy the text?",
          send_date: "2016-03-07",
          time:"08:00:00"  
        },
        {
          message: "you're doing very well Stephanie! Keep up the good work!",
          send_date: "2016-03-07",
          time:"08:00:00" 
        },
        {
          message: "exam next monday",
          send_date: "2016-03-07",
          time:"08:00:00"
        },
        


      ]);
    });
};
