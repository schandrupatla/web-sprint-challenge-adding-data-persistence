// build your `Project` model here
const dbAccess = require('../../data/dbConfig');

function getProjects() {
    return dbAccess('projects');
  }

  async function createProject(project){
    const [project_id] = await dbAccess('projects').insert(project);
    return getProjects().where({ project_id }).first();
  }

  module.exports = {
    getProjects,
    createProject
   
  };
  
