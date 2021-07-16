// build your `/api/tasks` router here
const express = require("express");
const db = require("../task/model");
const router = express.Router();
const { checkTaskPayload } = require("./middlewear");

router.get("/", (req, res, next) => {
  db.getTasks()
    .then((tasks) => {
      tasks.forEach((task) => {
        if (task.task_completed !== 0) {
          task.task_completed = "true";
        } else {
          task.task_completed = "false";
        }
      });
      res.status(200).json(tasks);
    })
    .catch(next);
});
router.post("/", checkTaskPayload, async (req, res, next) => {
  try {
    const newTask = await db.createTask(req.body);
    if (newTask.task_completed !== 0) {
      newTask.task_completed = "true";
    } else {
      newTask.task_completed = "false";
    }
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
