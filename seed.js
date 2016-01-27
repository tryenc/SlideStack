/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Class = Promise.promisifyAll(mongoose.model('Classes'));
var Presentation = Promise.promisifyAll(mongoose.model('Presentations'));

var seedUsers = function () {

    var users = [
        {
            _id: 1,
            name: 'Testy McTersterson',
            email: 'testing@fsa.com',
            role: 'teacher',
            isStudent: false,
            isTeacher: true,
            classes: [1, 2, 3],
            presentations: [1, 2, 3],
            password: 'password'
        },
        {
            _id: 2,
            name: 'Student MacTween',
            email: 'something_dramatic@gmail.com',
            role: 'student',
            isStudent: true,
            isTeacher: false,
            classes: [1, 2, 3],
            presentations: null,
            password: 'B13b3r'
        },
        {
            _id: 3,
            name: 'Ferris Beuller',
            email: 'beuller69@aol.com',
            role: 'student',
            isStudent: true,
            isTeacher: false,
            classes: [1],
            presentations: null,
            password: 'Sloane'
        },
        {   
            _id: 4,
            name: 'Ed Rooney',
            email: 'getinline@highschool.edu',
            role: 'teacher',
            isStudent: false,
            isTeacher: true,
            classes: [4, 5],
            presentations: [4],
            password: 'password'
        },
        {            
            _id: 5,
            name: 'Marty MacFly',
            email: 'BackInTime@earthlink.com',
            role: 'student',
            isStudent: true,
            isTeacher: false,
            classes: [4],
            presentations: null,
            password: 'J3nn1f3r'
        }
    ];

    return User.createAsync(users);

};

var seedClasses = function () {

    var classes = [
        {
            _id: 1,
            name: 'American History',
            description: 'The history of the United States spanning from the Native Americans to present day'
        },
        {
            _id: 2,
            name: 'Physics',
            description: 'An introduction to the laws that govern all things big and small'
        },
        {
            _id: 3,
            name: 'Greek Mythology',
            description: 'An overview of the most important characters and stories in Greek mythology'
        },
        {
            _id: 4,
            name: 'Film History',
            description: 'This is the only fun class this school has to offer'
        },
        {
            _id: 5,
            name: 'Literature',
            description: 'See name'
        }
    ];

    return Classes.createAsync(classes);

};

var seedPresentations = function () {

    var presentations = [
        {
            _id: 1,
            name: 'Shakespeare Shakedown',
            markdown:'#Heres some markdown about Shakespeare./n He wrote/n*Romeo and Juliet/n*Othello/n*MacBeth',
            class: 5
        },
        {
            _id: 2,
            name: 'How we raped the Native Americans',
            markdown:'#Heres some markdown about the Native Americans./n We used to call them _indians_',
            class: 1
        },
        {
            _id: 3,
            name: 'Sex and the Greeks',
            markdown:'#Sex in Greek Mythology/n##Everything that doesnt seem like its about sex is actually about sex./n These people are __worse__ than Disney',
            class: 3
        },
        {
            _id: 4,
            name: 'Alfred Hitchcock',
            markdown:'Here are some of the movies he made:./n*Birds/n*North By Northwest/n*Psycho',
            class: 5
        }
    ];

    return Presentations.createAsync(presentations);

};

connectToDb.then(function () {
    
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('User seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });

    Class.findAsync({}).then(function (classes) {
        if (classes.length === 0) {
            return seedClasses();
        } else {
            console.log(chalk.magenta('Seems to already be class data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Classes seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });

    Presentation.findAsync({}).then(function (presentations) {
        if (presentations.length === 0) {
            return seedPresentations();
        } else {
            console.log(chalk.magenta('Seems to already be presentation data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Presentation seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
