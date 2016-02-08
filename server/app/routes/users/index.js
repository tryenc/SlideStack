const router = require('express').Router();
const mongoose = require('mongoose');
const Promise = require('bluebird');
const UserModel = mongoose.model('User');
const PresentationModel = mongoose.model('Presentations');

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

    var user;

     UserModel.findById(req.params.id)
        .populate('classes presentations')
        .then(returnedUser => {
            user = returnedUser;
            



            user = returnedUser;
            if(user.isStudent){
                res.send(user);
            } else {
                return user.getStudents()
            }
        })
        .then(students => {
            //'toObject' turns 'user', which is a mongoose document,
            // into a JS object, which gives us the ability to add properties to it
            user = user.toObject();

            user.students = students;
            if(!user.isStudent){
                res.send(user);
            }
        })
        .then(null, next);

});

// router.get('/:id', (req, res, next) => {

//     var user;

//      UserModel.findById(req.params.id)
//         .populate('classes presentations')
//         .then(returnedUser => {
//             user = returnedUser;
//             if(user.isStudent){
//                 res.send(user);
//             } else {
//                 return user.getStudents()
//             }
//         })
//         .then(students => {
//             //'toObject' turns 'user', which is a mongoose document,
//             // into a JS object, which gives us the ability to add properties to it
//             user = user.toObject();

//             user.students = students;
//             if(!user.isStudent){
//                 res.send(user);
//             }
//         })
//         .then(null, next);

// });

// Create new user
router.post('/', (req, res, next) => {
    UserModel.create(req.body)
        .then(user => {
            req.logIn(user, function(loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send(
                    user.sanitize()
                );
            });
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
