// build your `/api/resources` router here
// build your `/api/projects` router here
const express = require('express');
const db = require('../resource/model');
const router = express.Router();

router.get('/', (req,res,next)=>{
    db.getResources()
        .then(resources=>{
            res.status(200).json(resources);
        })
        .catch(next);
})
router.post('/', (req, res, next) => { 
    db.createResource(req.body)
      .then(resource => {
        res.status(201).json(resource);
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
