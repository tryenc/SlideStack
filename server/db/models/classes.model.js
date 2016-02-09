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
    imageUrl: {
    	type: String,
    	default: 'https://s3.amazonaws.com/lbc-content/images/classes-icon.png'
    }
});

schema.pre('findOne', function (next) {
    console.log('pre hook: ', this._id);
    next();
});

mongoose.model('Classes', schema);
