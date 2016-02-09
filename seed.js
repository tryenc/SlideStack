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
                markdown:'#Heres some markdown about Shakespeare.\n He wrote\n*Romeo and Juliet«\n*Othello\n*MacBeth',
                class: classes[0]._id,
                theme: 'simple'
            },
            {
                name: 'How we raped the Native Americans',
                markdown:'#Heres some markdown about the Native Americans./n We used to call them _indians_',
                class: classes[1]._id,
                theme: 'black'
            },
            {
                name: 'How to Kill a Mockingbird',
                markdown:'#Sex in Greek Mythology/n##Everything is about sex drugs and rock and roll./n These people are __worse__ than Disney',
                class: classes[2]._id
            },
            {
                name: 'Where have all the cowgirls gone',
                markdown:'My First Presentation, my EG WILDE./n*Birds/n*North By Northwest/n*Psycho',
                class: classes[3]._id
            },

            // BREAK OLD //

            {
                name: 'Communication Breakdown',
                markdown:'#Led Zeppelin./n He wrote/n* $$$ Stuff and Juliet/n* $$$ Othello/n*Things',
                class: classes[4]._id
            },
            {
                name: 'How we saved the Native Americans',
                markdown:'#Heres some markdown about the Native Americans and how great white people are $$$ ' +
                    './n We used to call them _slaves_ $$$ This is the last slide',
                class: classes[5]._id
            },
            {
                name: 'Sex and the Greeks',
                markdown:'#Sex in Greek Mythology/n##Everything that doesnt seem like its about sex is actually about sex./n These people are __worse__ than Disney',
                class: classes[6]._id
            },
            {
                name: 'Tom Sawyer',
                markdown:'A book about nothing:./n*Birds/n*North By Northwest/n*Psycho',
                class: classes[7]._id
            },
            {
                name: 'A day in life of Morty',
                markdown:'#Sex in Greek Mythology/n## $$$ ./n These people are __worse__ than Disney',
                class: classes[1]._id
            },
            {
                name: 'Lord of the Flies',
                markdown:'Everybody dies in the end./n*Birds/n*North By Northwest/n*Psycho',
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
                password: 'B13b3r',
                classes: [presentations[2].class, presentations[3].class]
            },
            {
                name: 'Ferris Beuller',
                email: 'beuller69@aol.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'Sloane',
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
                password: 'J3nn1f3r',
                classes: [presentations[3].class, presentations[1].class]
            },

            // BREAK OLD //

            {
                name: 'Conner Greene',
                email: 'slacker@gmail.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'obviousPassword',
                classes: [presentations[1].class, presentations[2].class],
                presentations: [presentations[0]._id]
            },
            {
                name: 'Chris Tyren',
                email: 'creativeEmail@netscape.com',
                role: 'teacher',
                isStudent: false,
                isTeacher: true,
                password: 'ImNotCreative',
                classes: [presentations[2].class, presentations[3].class, presentations[4].class, presentations[5].class],
                presentations: [presentations[2]._id, presentations[4]._id, presentations[6]._id, presentations[8]._id]
            },
            {
                name: 'Joe Shmoe',
                email: 'jshmoe@aol.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'password123',
                classes: [presentations[4].class, presentations[5].class]
            },
            {
                name: 'Bill Nye',
                email: 'scienceGuy@pierson.edu',
                role: 'teacher',
                isStudent: false,
                isTeacher: true,
                password: 'meandering',
                classes: [presentations[6].class, presentations[5].class],
                presentations: [presentations[2]._id, presentations[7]._id]
            },
            {
                name: 'Hacksaw Jim Dueggen',
                email: 'rassling@wwf.com',
                role: 'student',
                isStudent: true,
                isTeacher: false,
                password: 'pileDriver',
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

