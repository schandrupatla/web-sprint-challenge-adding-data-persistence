// build your `/api/projects` router here
const express = require('express');
const db = require('../project/model');
const router = express.Router();
const {
  checkProjectPayload
} = require("./middlewear");

router.get('/', (req,res,next)=>{
    db.getProjects()
        .then(projects=>{
            projects.forEach(project=>{
              if(project.project_completed !== 0){
                 project.project_completed = "true"
              }
              else{
                project.project_completed = "false"
              }
            })
            res.status(200).json(projects);
        })
        .catch(next);
})
router.post('/', checkProjectPayload, async (req, res, next) => { 
  try{
    const newProject = await db.createProject(req.body)
        res.status(201).json(newProject);
    }
    catch(err){
      next(err);
    }
  });

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;