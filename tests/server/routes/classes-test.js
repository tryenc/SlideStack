/**
 * Created by Jon on 1/27/16.
 */

// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var ClassesModel = mongoose.model('Classes');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Classes Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('/', function() {

        var classesAgent, newclasses;

        beforeEach('Create a class', function (done) {
            ClassesModel.create({
                name: "Awesome classes",
                description: 'Here is the description'
            }).then(classes => {
                newclasses = classes;
                done();
            })
        });

        beforeEach('Create guest agent', function () {
            classesAgent = supertest.agent(app);
        });

        it('responds with an array of all classes', function(done) {
            classesAgent
                .get('/api/classes')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err);
                    else {
                        expect(response.body).to.be.an('array');
                        expect(response.body).to.have.length(1);
                        done();
                    }
                })
        });

        it('responds with one class', function(done) {
            classesAgent
                .get('/api/classes/' + newclasses._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err);
                    else {
                        expect(response.body._id).to.equal(newclasses._id.toString())
                        done();
                    }
                })
        });

        it('updates a classes', function(done) {
            classesAgent
                .put('/api/classes/' + newclasses._id)
                .send({name: 'newName'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(newclasses._id.toString());
                        expect(response.body.name).to.equal("newName");
                        done();
                    }
                })
        });

        it('creates a class', function(done) {
            classesAgent
                .post('/api/classes/')
                .send({
                    name: "A new classes",
                    description: "This is the description"
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body.name).to.equal('A new classes');
                        expect(response.body.description).to.equal('This is the description');
                        done();
                    }
                })
        });

        it('deletes a class', function(done) {
            classesAgent
                .delete('/api/classes/' + newclasses._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(newclasses._id.toString());
                        expect(response.body.description).to.equal(newclasses.description);
                        ClassesModel.findById(newclasses._id).then(found => {
                            expect(found).to.be.null;
                            done();
                        })
                    }
                })
        })
    })
});
