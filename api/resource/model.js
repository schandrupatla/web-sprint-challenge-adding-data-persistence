// build your `Resource` model here
const dbAccess = require('../../data/dbConfig');

function getResources() {
    return dbAccess('resources');
  }

  module.exports = {
    getResources
   
  };
  