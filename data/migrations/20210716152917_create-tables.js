
exports.up = async function(knex) {
    await knex.schema
    //table Projects
    .createTable('projects', table => {
      table.increments('project_id')
      table.string('project_name', 250).notNullable()
      table.string('project_description', 500).nullable()
      table.boolean('project_completed').defaultTo(false)
    })
    //table resources
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name', 250).notNullable().unique()
        table.string('resource_description', 500).nullable()
      })
        //table Tasks
    .createTable('tasks', table => {
        table.increments('task_id')
        table.string('task_description', 500).notNullable()
        table.string('task_notes', 250).nullable()
        table.boolean('task_completed').defaultTo(false)
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT').onUpdate('RESTRICT')
    })
         //table Project_Resouces
    .createTable('project_resources', table => {
        table.increments('project_resource_id')
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT').onUpdate('RESTRICT')
        table.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('RESTRICT').onUpdate('RESTRICT')
    })
};

exports.down = async function(knex) {
        await knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
      };
