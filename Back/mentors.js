// REST API for the opinions collection
const express = require('express');
const router = express.Router();

// Connect to the collection
let db = null;
const mongodb = require('mongodb');
mongodb.MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) throw error;
  db = client.db('QRC');
  db.mentors = db.collection('mentors');
});

// Get all mentors
router.get('/', function(request, response, next) {
  const user_id = request.query.user;
    db.mentors.find().toArray(function(error, mentors) {
      if (error) return next(error);
      response.json(mentors);
    });
});

router.patch('/', function(request, response, next) {
  const mentor_query = {goid: request.user.id};

  const update = {$set:{
    name:request.body.new_name,
    majors:request.body.new_majors,
    minors:request.body.new_minors,
    courses:request.body.new_courses
  }
  };

  console.log(mentor_query);
  console.log(update);
  db.mentors.updateOne(mentor_query, update, function(error, report){
  if (error) return next(error);
  if (!report.matchedCount) return next(new Error('Not found'));
  response.send('undo');
});

});
router.delete('/:id', function(request,response,next){
  const mentor_query = {goid:request.params.id};
  db.mentors.deleteOne(mentor_query, function(error,report) {
    if (error) return next(error);
    if (!report.deleteCount) return next(new Error('Forbidden'));
    response.end();
  })
})

router.post('/',function(request,response,next){
  const mentor = {
    name: request.body.new_name, // Logged-in user
    majors: request.body.new_majors,
    minors: request.body.new_minors,
    courses:request.body.new_courses,
    goid:request.body.new_goid,
    photo:request.body.new_photo,
  };

  db.mentors.insertOne(mentor, function(error) {
    if (error) return next(error);
    response.json(mentor);
  });
});

module.exports = router;
