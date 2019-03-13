// REST API for the opinions collection
const express = require('express');
const router = express.Router();

// Connect to the collection
let db = null;
const mongodb = require('mongodb');
mongodb.MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) throw error;
  db = client.db('QRC');
  db.evals = db.collection('evals');
});

// Get all the staff
router.post('/', function(request, response, next) {

  const eval = {
    object:request.body.object,
    rating:parseInt(request.body.rating),
    comment:request.body.comment
  };

  db.evals.insertOne(eval, function(error) {
    if (error) return next(error);
    response.send('Success!');
  });
});



module.exports = router;
