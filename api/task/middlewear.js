

exports.checkTaskPayload = (req, res, next) => {
    const error = { status: 400 };
    const { task_description, task_completed,  project_id } = req.body;
  
    if (task_description === undefined || task_completed === undefined) {
      error.message = "task_description and task_completed are required";
    } else if (typeof task_description !== "string") {
      error.message = "Description of the task must be a string";
    } else if (task_description.trim().length < 3 || task_description.trim().length > 250) {
      error.message = "description of the project must be between 3 and 250 characters";
    } else if (typeof task_completed !== "number" ||isNaN(task_completed) || task_completed < 0 || task_completed > 1)  {
      error.message = "task_completed of tasks must be a number with a value of 0(false) or 1(true)";
    }
    else if (typeof  project_id !== "number" ||isNaN( project_id) ||  project_id === undefined )  {
        error.message = " project_id is required thats exists as primary key in projects table";
      }
  
    if (error.message) {
      next(error);
    } else {
      next();
    }
}