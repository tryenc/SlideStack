/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

// Get all classes
router.get('/', (req, res, next) => {

    UserModel.find().exec()
        .then(classes => {
            res.send(classes);
        })
        .then(null, next);

});

// Get a class by _id
router.get('/:id', (req, res, next) => {

    UserModel.findById(req.params.id).exec()
        .then(oneClass => {
            res.send(oneClass);
        })
        .then(null, next);

});

// Create new class
router.post('/', (req, res, next) => {

    UserModel.create(req.body)
        .then(newUser => {
            res.status(201).send(newUser);
        })
        .then(null, next);

});

// Update a class
router.put('/:id', (req, res, next) => {

    UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec()
        .then(updatedClass => {
            res.send(updatedClass);
        })
        .then(null, next);

});

// Delete a class
router.delete('/:id', (req, res, next) => {

    UserModel.findByIdAndRemove(req.params.id).exec()
        .then(updatedClass => {
            res.send(updatedClass);
        })
        .then(null, next);

});

module.exports = router;
