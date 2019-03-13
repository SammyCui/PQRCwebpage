// REST API for the opinions collection
const express = require('express');
const router = express.Router();

// Connect to the collection
let db = null;
const mongodb = require('mongodb');
mongodb.MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) throw error;
  db = client.db('QRC');
  db.staffs = db.collection('staffs');
});

// Get all the staff
router.get('/', function(request, response, next) {
  const user_id = request.query.user;
    db.staffs.find().toArray(function(error, staffs) {
      if (error) return next(error);
      response.json(staffs);
    });
});

router.get('/:id', function(request, response, next){
  const go_id_query = {goid:request.params.id};
  db.staffs.findOne(go_id_query,function(error, staff){
    if(error) return next(error);
    if(staff){
      response.send('yes');
    }
  })
});


module.exports = router;
