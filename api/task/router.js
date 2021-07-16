// build your `/api/tasks` router here
const express = require('express');
const db = require('../task/model');
const router = express.Router();

router.get('/', (req,res,next)=>{
    db.getTasks()
        .then(tasks=>{
            res.status(200).json(tasks);
        })
        .catch(next);
})
router.post('/', (req, res, next) => { 
    db.createTask(req.body)
      .then(task => {
        res.status(201).json(task);
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