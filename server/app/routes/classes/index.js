/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const ClassesModel = mongoose.model('Classes');
const UserModel = mongoose.model('Users');

// Get all classes
router.get('/', (req, res, next) => {

    ClassesModel.find().exec()
        .then(classes => {
            res.send(classes);
        })
        .then(null, next);

});

// Get a class by _id
router.get('/:id', (req, res, next) => {

    ClassesModel.findById(req.params.id).exec()
        .then(oneClass => {
            res.send(oneClass);
        })
        .then(null, next);

});

// Get a class list of students
router.get('/:id/students', (req, res, next) => {
    const id = req.params.id;

    UserModel.find({ classes: id, isStudent: true})
        .then(arrayOfStudents => {
            res.send(arrayOfStudents)
        })
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

// Update a class
router.put('/:id', (req, res, next) => {

    ClassesModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec()
        .then(updatedClass => {
            res.send(updatedClass);
        })
        .then(null, next);

});

// Delete a class
router.delete('/:id', (req, res, next) => {

    ClassesModel.findByIdAndRemove(req.params.id).exec()
        .then(deletedClass => {
            res.send(deletedClass);
        })
        .then(null, next);

});

module.exports = router;
