// build your `Task` model here
const dbAccess = require('../../data/dbConfig');

function getTasks() {
     //sql query
    // select t.*,p.project_name,p.project_description
    // from tasks t
    // join projects p
    // on t.project_id = p.project_id;

    return dbAccess('tasks as t')
    .join('projects as p','t.project_id', '=' , 'p.project_id')
    .select('t.*', 'p.project_name','p.project_description');
  }
  
  async function createTask(task){
    const [task_id] = await dbAccess('tasks').insert(task);
    return getTasks().where({ task_id }).first();
  }

  module.exports = {
    getTasks,
    createTask
   
  };
  