// build your `/api/projects` router here
const express = require('express');
const db = require('../project/model');
const router = express.Router();


router.get('/', (req,res,next)=>{
    db.getProjects()
        .then(projects=>{
          if(projects.project_completed !== 1){
            projects.project_completed === "false"
        }
        else{
          projects.project_completed === "true"
        }
            res.status(200).json(projects);
        })
        .catch(next);
})
router.post('/', (req, res, next) => { 
    db.createProject(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(next);
  });

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;