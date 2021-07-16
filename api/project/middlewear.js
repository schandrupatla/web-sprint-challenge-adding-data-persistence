

exports.checkProjectPayload = (req, res, next) => {
    const error = { status: 400 };
    const { project_name,  project_completed } = req.body;
    
    if (project_name === undefined   || project_completed === undefined) {
      error.message = "project_name and project_completed are required";
    } else if (typeof project_name !== "string") {
      error.message = "name of the project must be a string";
    } else if (project_name.trim().length < 3 || project_name.trim().length > 250) {
      error.message = "name of the project must be between 3 and 250 characters";
     } else if (typeof project_completed !== "boolean"  || project_completed === 1 || project_completed === 0)  {
      error.message = "project_completed of project must be a boolean with a value of true or false";
    }

    if (error.message) {
      next(error);
    } else {
      next();
    }
}
  