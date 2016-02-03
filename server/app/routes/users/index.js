/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

// Get all users
router.get('/', (req, res, next) => {

    UserModel.find().populate('classes')
        .then(users => {
            res.send(users);
        })
        .then(null, next);

});

// Get a user by _id
router.get('/:id', (req, res, next) => {

    UserModel.findById(req.params.id)
        .populate('classes presentations')
        .then(user => {
            res.send(user);
        })
        .then(null, next);

});

// Get a teacher's students
router.get('/students/:classId', (req, res, next) => {

    UserModel.find({
        classes: req.params.classId,
        isStudent: true
    })
        .then(students => res.send(students))
        .then(null, next);
})

// Create new user
router.post('/', (req, res, next) => {

    UserModel.create(req.body)
        .then(newUser => {
            res.status(201).send(newUser);
        })
        .then(null, next);

});

// Update a user
router.put('/:id', (req, res, next) => {

    UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).populate('classes')
        .then(updatedUser => {
            console.log(updatedUser);
            res.send(updatedUser);
        })
        .then(null, next);

});

// Delete a user
router.delete('/:id', (req, res, next) => {

    UserModel.findByIdAndRemove(req.params.id)
        .then(deletedUser => {
            res.send(deletedUser);
        })
        .then(null, next);

});

module.exports = router;
