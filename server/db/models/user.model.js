    'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

/**
 * Nothing required yet until seed files are written
 */

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        enum: ['student', 'teacher']
    },
    imageUrl: {
        type: String,
        default: 'https://tracker.moodle.org/secure/attachment/30912/f3.png'
    },
    isStudent: {
        type: Boolean
    },
    isTeacher : {
        type: Boolean
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes'
    }],
    presentations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presentations'
    }],
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// get all of a teacher's students, aka query for all users that have the same class and filter by isTeacher = true
schema.methods.getStudents = function() {
    return this.find({
        classes: { $in: this.classes },
        isTeacher: false
    })
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
