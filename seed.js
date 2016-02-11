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



var classes = [
    {
        name: 'American History',
        description: 'The history of the United States spanning from the Native Americans to present day'
    },
    {
        name: 'Physics',
        description: 'An introduction to the laws that govern all things big and small'
    },
    {
        name: 'Greek Mythology',
        description: 'An overview of the most important characters and stories in Greek mythology'
    },
    {
        name: 'Film History',
        description: 'This is the only fun class this school has to offer'
    },
    {
        name: 'Literature',
        description: 'See name'
    },
    {
        name: 'Math',
        description: 'An introduction to the laws that govern all things big and small'
    },
    {
        name: 'Computer Science',
        description: 'An overview of the most important characters and stories in Greek mythology'
    },
    {
        name: 'Phys Ed',
        description: 'This is the only fun class this school has to offer'
    },
    {
        name: 'Theater',
        description: 'See name'
    }
];

var seedClasses = function () {

    return Class.createAsync(classes);

};

connectToDb.then(function () {

    Class.findAsync({}).then(function(classes){
        if (classes.length === 0) {
            return seedClasses();
        } else {
            console.log(chalk.magenta('Seems to already be class data, exiting!'))
        }
    }).then(function(classes){
        console.log("classes", classes);
        classes = classes;

        presentations = [
            {
                name: 'Shakespeare Shakedown',
                markdown:'# Heres some markdown about Shakespeare.\n He wrote\n*Romeo and Juliet«\n*Othello\n*MacBeth',
                class: classes[4]._id,
                theme: 'simple'
            },
            {
                name: 'The Native Americans',
                markdown:'# Heres some markdown about the Native Americans.',
                class: classes[0]._id,
                theme: 'black'
            },
            {
                name: 'To Kill a Mockingbird',
                markdown:'# Atticus Finch was a great lawyer, a great father and a great man',
                class: classes[4]._id
            },
            {
                name: 'Advanced Calculus',
                markdown:'# Advanced Calculus',
                class: classes[5]._id
            },
            {
                name: 'Communication Breakdown',
                markdown:'# Led Zeppelin.',
                class: classes[8]._id
            },
            {
                name: 'Compilers and Interpreters',
                markdown:"#What's going on under the hood",
                class: classes[6]._id
            },
            {
                name: 'Pushups',
                markdown:'# Drop and give me 20!',
                class: classes[7]._id
            },
            {
                name: 'Huckleberry Finn',
                markdown:'# Mark Twain and the Anti-Hero',
                class: classes[4]._id
            },
            {
                name: 'Orson Welles',
                markdown:"# The Highs and Lows of One of America's Greatest Actors",
                class: classes[1]._id
            },
            {
                name: 'An American In Paris',
                markdown:'# Those Parisians sure can dance',
                class: classes[2]._id
            }
        ];

        return Presentation.createAsync(presentations);

    }).then(function(presentations){
        console.log("presentations", presentations);
        var users = [
            {
                name: 'Testy McTersterson',
                email: 'testing@fsa.com',
                role: 'teacher',
                isStudent: false,
                isTeacher: true,
                password: 'password',
                classes: [presentations[0].class, presentations[1].class, presentations[9].class, presentations[8].class],
                presentations: [presentations[0]._id, presentations[1]._id, presentations[2]._id, presentations[3]._id]
            },
            {
                name: 'Student MacTween',
                email: 'something_dramatic@gmail.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password',
                classes: [presentations[2].class, presentations[3].class]
            },
            {
                name: 'Ferris Beuller',
                email: 'beuller69@aol.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password',
                classes: [presentations[1].class, presentations[2].class]
            },
            {
                name: 'Ed Rooney',
                email: 'getinline@highschool.edu',
                role: 'teacher',
                isStudent: false,
                isTeacher: true,
                password: 'password',
                classes: [presentations[3].class, presentations[1].class, presentations[7].class, presentations[6].class],
                presentations: [presentations[4]._id, presentations[5]._id, presentations[6]._id, presentations[7]._id]
            },
            {
                name: 'Marty MacFly',
                email: 'BackInTime@earthlink.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password',
                classes: [presentations[3].class, presentations[1].class]
            },

            // BREAK OLD //

            {
                name: 'Conner Greene',
                email: 'slacker@gmail.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password',
                classes: [presentations[1].class, presentations[2].class],
                presentations: [presentations[0]._id]
            },
            {
                name: 'Chris Tyren',
                email: 'creativeEmail@netscape.com',
                role: 'teacher',
                isStudent: false,
                isTeacher: true,
                password: 'password',
                classes: [presentations[2].class, presentations[3].class, presentations[4].class, presentations[5].class],
                presentations: [presentations[2]._id, presentations[4]._id, presentations[6]._id, presentations[8]._id]
            },
            {
                name: 'Joe Shmoe',
                email: 'jshmoe@aol.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password',
                classes: [presentations[4].class, presentations[5].class]
            },
            {
                name: 'Bill Nye',
                email: 'scienceGuy@pierson.edu',
                role: 'teacher',
                isStudent: false,
                isTeacher: true,
                password: 'password',
                classes: [presentations[6].class, presentations[5].class],
                presentations: [presentations[2]._id, presentations[7]._id]
            },
            {
                name: 'Hacksaw Jim Dueggen',
                email: 'rassling@wwf.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password',
                classes: [presentations[6].class, presentations[7].class, presentations[9].class, presentations[1].class]
            }

        ];

        return User.createAsync(users);

    }).then(function(){
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function(err){
        console.error(err);
        process.kill(1);
    });
});

