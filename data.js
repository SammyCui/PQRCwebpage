const db = new Mongo().getDB('QRC');
db.dropDatabase();

//validator
db.createCollection('mentors', {validator: {$and: [
  {goid: {$type: 'string', $ne: ''}}, //Google id
  {name: {$type: 'string', $ne: ''}},
  {cell:{$type: 'string', $ne: ''}}, // 10 digit
  {majors: {$type: 'array'}},  // array of people who have upvoted this opinion, starts with author's id
  {minors: {$type: 'array'}}, // array of people who have upvoted this opinion, starts with author's id
  {courses:{$type:'array'}},
  {photo:{$type: 'url'}},
]}});
db.createCollection('staffs', {validator: {$and :[
  {goid: {$type: 'string', $ne: ''}},
  {name: {$type: 'string', $ne: ''}},
  {cell:{$type: 'string', $ne: ''}}, // 10 digit
  {office: {$type: 'string', $ne: ''}},
  {email:{$type: 'string', $ne: ''}},
  {tags: {$type: 'string', $ne: ''}},
  {photo:{$type: 'url'}},
]}});

db.createCollection('shifts', {validator:{$and :[
  {'mentor.goid': {$type:'string', $ne: ''}},
  {'mentor.first': {$type:'string', $ne: ''}},
  {'mentor.last': {$type:'string', $ne: ''}},
  {timein: {$type:'int'}}, // TODO: need to give a range in validator
  {timeout:{$type:'int'}}, // shift range range [10,23]
  {dayofweek:{$type: 'int'}}, // range [0,6] TODO: Remember to add $dayofweek: <date> when posting new shifts
  {'mentor.courses':{$type: 'array'}}
]}});

db.createCollection('evals', {validator: {$and :[
  {object: {$type: 'string', $ne: ''}},
  {rating: {$type: 'int'}},
  {comment:{$type: 'string'}},
]}});

db.staffs.insertMany([
  {
    goid:  '115802352201980932294',
    name: 'Michael Schuckers',
    cell: '(315)229-5794',
    office: 'Bewkes Science Hall 128',
    tags:'Rutherford Professor of Mathematics, Professor of Statistics, Peterson Quantitative Resource Center Director',
    email:'schuckers@stlawu.edu',
    photo:'https://www.stlawu.edu/sites/default/files/styles/profile_photo/public/profile-photo/Schuckers_Michael_web1.jpg'
  },

  {
    goid:  '115804452201980932291',
    name: 'Xuanming Cui',
    cell: '(315)229-5794',
    office: 'Bewkes Science Hall 128',
    tags:'Rutherford Professor of Mathematics, Professor of Statistics, Peterson Quantitative Resource Center Director',
    email:'schuckers@stlawu.edu',
    photo:'https://uploads.thealternativepress.com/uploads/photos/best_crop_cce82ebc1c49ac485bdd_1e9428d98904c07e1e67_st@2x._lawrence_university@2x.jpg'
  },

  {
    goid:  '110255731191036296771',
    name: 'Yuxi Zhang',
    cell: '1234567891',
    office: 'Bewkes Science Hall 144',
    tags:'PQRC Mentor',
    email:'bungo@stlawu.edu',
    photo: 'http://www.stlawu.edu/sites/default/files/styles/profile_photo/public/Yuxi.jpg'
  },
  {
    goid:  '114095023332102109087',
    name: 'Lisa Torrey',
    cell: '3152295446',
    office: 'Bewkes Science Hall 106',
    tags:'Computer Science Professor',
    email:'ltorrey@stlawu.edu',
    photo: 'https://www.stlawu.edu/sites/default/files/styles/profile_photo/public/profile-photo/DSC_8330.JPG'
  },

]);

db.shifts.insertMany([
  {
    mentor:
    {goid:'112225756921519171786', first: 'Yuexin', last:"Li",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220', 'Math-280','Math-306', 'CS-374']
    },
    timein:NumberInt(19),
    timeout:NumberInt(21),
    dayofweek:NumberInt(0)
  },
  {
    mentor:
    {goid:'103291044076270243312', first: 'Nevaan', last:"Perera",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220', 'CS-364', 'CS-374']
    },
    timein:NumberInt(19),
    timeout:NumberInt(21),
    dayofweek:NumberInt(0)
  },
  {
    mentor:
    {goid:'103291044076270243312', first: 'Nevaan', last:"Perera",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220', 'CS-364', 'CS-374']
    },
    timein:NumberInt(10),
    timeout:NumberInt(12),
    dayofweek:NumberInt(2)
  },
  {
    mentor:
    {goid:'103291044076270243312', first: 'Nevaan', last:"Perera",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220', 'CS-364', 'CS-374']
    },
    timein:NumberInt(12),
    timeout:NumberInt(14),
    dayofweek:NumberInt(3)
  },
  {
    mentor:
    {goid:'112225756921519171786', first: 'Yuexin', last:"Li",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220', 'Math-280','Math-306', 'CS-374']
    },
    timein:NumberInt(14),
    timeout:NumberInt(16),
    dayofweek:NumberInt(4)
  },
  {
    mentor:
    {goid:'112225756921519171786', first: 'Yuexin', last:"Li",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220', 'Math-280','Math-306', 'CS-374']
    },
    timein:NumberInt(16),
    timeout:NumberInt(19),
    dayofweek:NumberInt(4)
  },
  {
    mentor:
    {goid:'115804452201980932291', first: 'Xuanming', last:"Cui",
    courses:['CS-140', 'CS-256', 'CS-220']
    },
    timein:NumberInt(19),
    timeout:NumberInt(21),
    dayofweek:NumberInt(5)
  },
  {
    mentor:
    {goid:'115804452201980932291', first: 'Xuanming', last:"Cui",
    courses:['CS-140', 'CS-256', 'CS-220']
    },
    timein:NumberInt(10),
    timeout:NumberInt(12),
    dayofweek:NumberInt(6)
  },

  {
    mentor:
    {goid:'110255731191036296771', first: 'Yuxi', last:"Zhang",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220','CS-4003','CS-374', 'CS-364', 'Math-280', 'Math-305']
    },
    timein:NumberInt(19),
    timeout:NumberInt(21),
    dayofweek:NumberInt(5)
  },
  {
    mentor:
    {goid:'110255731191036296771', first: 'Yuxi', last:"Zhang",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220','CS-4003','CS-374', 'CS-364', 'Math-280', 'Math-305']
    },
    timein:NumberInt(21),
    timeout:NumberInt(23),
    dayofweek:NumberInt(5)
  },
  {
    mentor:
    {goid:'110255731191036296771', first: 'Yuxi', last:"Zhang",
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220','CS-4003','CS-374', 'CS-364', 'Math-280', 'Math-305']
    },
    timein:NumberInt(12),
    timeout:NumberInt(14),
    dayofweek:NumberInt(1)
  },

]);

db.mentors.insertMany([
  {
    goid:  '103291044076270243312',
    name: 'Nevaan Perera',
    cell: '1234567890',
    majors: ['Computer Science', 'Psychology'],
    minors:['Music'],
    courses:['CS-140', 'CS-256', 'CS-220', 'CS-219', 'CS-313'],
    photo:'http://www.stlawu.edu/sites/default/files/styles/profile_photo/public/DSC00600.jpeg'
  },
  {
    goid:  '115804452201980932291',
    name: 'Xuanming Cui',
    cell: '1234567890',
    majors: ['Computer Science', 'Mathematics'],
    minors:['Music'],
    courses:['CS-140', 'CS-256', 'CS-220'],
    photo: "https://www.stlawu.edu/sites/default/files/styles/profile_photo/public/profile-photo/Schuckers_Michael_web1.jpg"
  },
  {
    goid:  '110255731191036296771',
    name: 'Yuxi Zhang',
    cell: '1234567891',
    majors: ['Computer Science', 'Mathematics'],
    minors:[],
    courses:['CS-140', 'CS-256', 'CS-219'],
    photo: 'http://www.stlawu.edu/sites/default/files/styles/profile_photo/public/Yuxi.jpg'
  },
  {
    goid:  '112225756921519171786',
    name: 'Yuexin Li',
    cell: '1234567892',
    majors: ['Computer Science', 'Mathematics'],
    minors:[],
    courses:['CS-140', 'CS-256', 'CS-219', 'CS-220'],
    photo: 'http://www.stlawu.edu/sites/default/files/styles/profile_photo/public/Yuexin%20Li.jpg'
  },
  {
    goid:  '114095023332102109087',
    name: 'Lisa Torrey',
    cell: '3152295446',
    photo: 'https://www.stlawu.edu/sites/default/files/styles/profile_photo/public/profile-photo/DSC_8330.JPG'
  },
]);

//TODO: collection for general info
