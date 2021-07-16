// build your `Resource` model here
const dbAccess = require('../../data/dbConfig');

function getResources() {
    return dbAccess('resources');
  }

  async function createResource(resource){
    const [resource_id] = await dbAccess('resources').insert(resource);
    return getResources().where({ resource_id }).first();
  }

  module.exports = {
    getResources,
    createResource
   
  };
  