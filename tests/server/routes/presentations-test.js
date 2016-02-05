/**
 * Created by Jon on 1/27/16.
 */

// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var PresentationsModel = mongoose.model('Presentations');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Presentations Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('/', function() {

        var presentationAgent, newPresentation;

        beforeEach('Create a presentation', function (done) {
            PresentationsModel.create({
                name: "Awesome Presentation",
                markdown: 'some string'
            }).then(presentation => {
                newPresentation = presentation;
                done();
            })
        });

        beforeEach('Create guest agent', function () {
            presentationAgent = supertest.agent(app);
        });

        it('responds with an array of all presentations', function(done) {
            presentationAgent
                .get('/api/presentations')
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

        it('responds with one presentation', function(done) {
            presentationAgent
                .get('/api/presentations/' + newPresentation._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err);
                    else {
                        expect(response.body._id).to.equal(newPresentation._id.toString())
                        done();
                    }
                })
        });

        it('updates a presentation', function(done) {
            presentationAgent
                .put('/api/presentations/' + newPresentation._id)
                .send({name: 'newName'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(newPresentation._id.toString());
                        expect(response.body.name).to.equal("newName");
                        done();
                    }
                })
        });

        it('creates a presentation', function(done) {
            presentationAgent
                .post('/api/presentations/')
                .send({
                    name: "A new presentation",
                    markdown: "This is markdown"
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body.name).to.equal('A new presentation');
                        expect(response.body.markdown).to.equal('This is markdown');
                        done();
                    }
                })
        });

        it('deletes a presentation', function(done) {
            presentationAgent
                .delete('/api/presentations/' + newPresentation._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(newPresentation._id.toString());
                        expect(response.body.email).to.equal(newPresentation.email);
                        PresentationsModel.findById(newPresentation._id).then(found => {
                            expect(found).to.be.null;
                            done();
                        })
                    }
                })
        })
    })
});
