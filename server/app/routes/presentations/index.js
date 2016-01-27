/**
 * Created by Jon on 1/27/16.
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const PresentationsModel = mongoose.model('Presentations');

// Get all classes
router.get('/', (req, res, next) => {

    PresentationsModel.find().exec()
        .then(classes => {
            res.send(classes);
        })
        .catch(next);

});

// Get a class by _id
router.get('/:id', (req, res, next) => {

    PresentationsModel.findById(req.params.id).exec()
        .then(oneClass => {
            res.send(oneClass);
        })
        .catch(next);

});

// Create new class
router.post('/', (req, res, next) => {

    PresentationsModel.create(req.body).exec()
        .then( () => {
            res.sendStatus(201);
        })
        .catch(next);

});

// Update a class
router.put('/:id', (req, res, next) => {

    PresentationsModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec()
        .then(updatedClass => {
            res.send(updatedClass);
        })
        .catch(next);

});

// Delete a class
router.delete('/:id', (req, res, next) => {

    PresentationsModel.findByIdAndRemove(req.params.id).exec()
        .then(updatedClass => {
            res.send(updatedClass);
        })
        .catch(next);

});

