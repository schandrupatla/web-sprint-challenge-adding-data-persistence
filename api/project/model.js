// build your `Project` model here
const dbAccess = require('../../data/dbConfig');

function getProjects() {
    return dbAccess('projects')
    .select( 'project_name','project_description', 'project_completed')
    
  }

   function createProject(project){
    const [project_id] =  dbAccess('projects').insert(project);
    return getProjects().where({ project_id }).first();
  }

  module.exports = {
    getProjects,
    createProject
   
  };
  
