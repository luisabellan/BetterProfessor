
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('userId')
            tbl.string('username', 128)
                .unique()
                .notNullable()
            tbl.text('password')
                .notNullable()
            tbl.string('name', 128)
                .notNullable()
            tbl.string('email_address', 128)
                .unique()
                .notNullable()
            
            tbl.enum("role", ["student", "mentor"])
                .notNull()
                .defaultTo("student")
        })
        .createTable('projects', tbl => {

            tbl.increments()
            tbl.string('name', 128)
                .notNullable()
            tbl.date('due_date')
                .notNullable()
            tbl.enum('user_id', [])
                .unique()
                .unsigned()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')


        })
        .createTable('reminders', tbl => {
            tbl.increments()

            tbl.text('message')
                .notNullable()
            tbl.date('send_date')
                .notNullable
            tbl.time('time')
                .notNullable
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })

        .createTable('users_projects', tbl => {
            tbl.integer('user_id')
                .unsigned()
                .references('id')
                // this table must exist already
                .inTable('users')
            tbl.integer('project_id')
                .unsigned()
                .references('id')
                // this table must exist already
                .inTable('projects')

            // the combination of the two keys becomes our primary key
            // will enforce unique combinations of ids
            tbl.primary(['user_id', 'project_id']);
        });




}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('projects')
        .dropTableIfExists('reminders')
        .dropTableIfExists('users_projects')
}
