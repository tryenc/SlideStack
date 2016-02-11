/**
 * Created by Jon on 1/27/16.
 */

var mongoose = require('mongoose');

/**
 * Nothing required yet until seed files are written
 */

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    imageUrl: {
    	type: String,
    	default: 'https://s3.amazonaws.com/lbc-content/images/classes-icon.png'
    }
});

schema.statics.findClassesByTeacher = function (userId) {
    return this.find({ teacher: userId });
};

schema.statics.findClassesByStudents = function (userId) {
    return this.find({ students: {$in: [userId]} });
};

mongoose.model('Classes', schema);
