/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const ClassesModel = mongoose.model('Classes');
const UserModel = mongoose.model('Users');
const PresentationModel = mongoose.model('Presentations');

// Get all classes
router.get('/', (req, res, next) => {

    var classes = ClassesModel.findById(req.params.id)
        .populate('teacher students');
    var presentations = PresentationModel.findPresentationsByClass(req.params.id);
    Promise.all([classes, presentations])
    .then(results => {
      var foundClass = results[0];
      var presentations = results[1];
      res.send({foundClass: foundClass, presentations: presentations})
    })
    .then(null, next);
});


// // Get a class list of students
// router.get('/:id/students', (req, res, next) => {
//     const id = req.params.id;
//
//     UserModel.find({ classes: id, isStudent: true})
//         .then(arrayOfStudents => {
//             res.send(arrayOfStudents)
//         })
//         .then(null, next);
//
// });

// Get all classes a user teaches
router.get('/teacher/:userId', function (req, res, next) {
    ClassesModel.findClassesByTeacher(req.params.userId)
        .then(classes => res.json(classes))
        .then(null, next);
});

// Get all classes a user is a student in
router.get('/student/:userId', function (req, res, next) {
    ClassesModel.findClassesByStudents(req.params.userId)
        .then(classes => res.json(classes))
        .then(null, next);
});

// Create new class
router.post('/', (req, res, next) => {

    ClassesModel.create(req.body)
        .then(newClass => {
            res.status(201).send(newClass);
        })
        .then(null, next);

});

// Get a class by _id
router.get('/:id', (req, res, next) => {

    ClassesModel.findById(req.params.id)
        .populate('teacher students')
        .then(oneClass => {
            res.send(oneClass);
        })
        .then(null, next);

});

// Update a class
router.put('/:id', (req, res, next) => {

    ClassesModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(updatedClass => {
            res.send(updatedClass);
        })
        .then(null, next);

});

// Delete a class
router.delete('/:id', (req, res, next) => {

    ClassesModel.findByIdAndRemove(req.params.id)
        .then(deletedClass => {
            res.send(deletedClass);
        })
        .then(null, next);

});

module.exports = router;
