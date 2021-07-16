const dbConfig = require("../../data/dbConfig");
const db = require("./model");

exports.checkProjectPayload = (req, res, next) => {
    const error = { status: 400 };
    const { project_name,  project_completed } = req.body;
  
    if (project_name === undefined || project_completed === undefined) {
      error.message = "project_name and project_completed are required";
    } else if (typeof project_name !== "string") {
      error.message = "name of the project must be a string";
    } else if (project_name.trim().length < 3 || project_name.trim().length > 250) {
      error.message = "name of the project must be between 3 and 250 characters";
    } else if (typeof project_completed !== "number" ||isNaN(project_completed) || project_completed < 0 || project_completed > 1)  {
      error.message = "project_completed of project must be a number with a value of 0(false) or 1(true)";
    }
  
    if (error.message) {
      next(error);
    } else {
      next();
    }
}
  