
exports.up = async function (knex) {
    await knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('username', 128)
            .unique()
            .notNullable();
        tbl.text('password')
            .notNullable();
        tbl.string('name', 128)
            .notNullable();
        tbl.string('email_address', 128)
            .unique()
            .notNullable();

        tbl.enum("role", ["student", "mentor"])
            .notNull()
            .defaultTo("student");
    })

    await knex.schema.createTable("sessions", (table) => {
        table.increments()
        table.integer("user_id")
            .notNull()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.timestamp("expires")
    })

    await knex.schema.createTable('projects', tbl => {

        tbl.increments();
        tbl.string('name', 128)
            .unique()
            .notNullable();
        tbl.date('due_date')
            .notNullable();



    });

    await knex.schema.createTable('reminders', tbl => {
        tbl.increments()

        tbl.text('message')
            .notNullable()
        tbl.date('send_date')
            .notNullable
        tbl.time('time')
            .notNullable
        tbl.integer('user_id')
            .notNull()
            .unsigned()
            .references('id')
            // this table must exist already
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

    });


    await knex.schema.createTable('projects_users', tbl => {


        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            // this table must exist already
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


        tbl.integer('user_id')
            .unsigned()
            .references('id')
            // this table must exist already
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');




        // the combination of the two keys becomes our primary key
        // will enforce unique combinations of ids
        tbl.primary(['project_id','user_id']);
    });







}

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('projects_users')
    .dropTableIfExists('reminders')
    .dropTableIfExists('projects')
    .dropTableIfExists('sessions')
    .dropTableIfExists('users')
}
