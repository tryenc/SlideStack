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
var UserModel = Promise.promisifyAll(mongoose.model('Users'));
var ClassModel = Promise.promisifyAll(mongoose.model('Classes'));
var PresentationModel = Promise.promisifyAll(mongoose.model('Presentations'));


connectToDb.then(function () {

    mongoose.connection.db.dropDatabase();

    // Create the users
    var users = [
        {
            name: 'Testy McTersterson',
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: true
        },
        {
            name: 'Student MacTween',
            email: 'something_dramatic@gmail.com',
            password: 'password',
        },
        {
            name: 'Ferris Beuller',
            email: 'beuller69@aol.com',
            password: 'password',
        },
        {
            name: 'Ed Rooney',
            email: 'getinline@highschool.edu',
            password: 'password',
        },
        {
            name: 'Marty MacFly',
            email: 'BackInTime@earthlink.com',
            password: 'password',
        },
        {
            name: 'Conner Greene',
            email: 'slacker@gmail.com',
            password: 'password',
        },
        {
            name: 'Chris Tyren',
            email: 'creativeEmail@netscape.com',
            password: 'password',
        },
        {
            name: 'Joe Shmoe',
            email: 'jshmoe@aol.com',
            password: 'password',
        },
        {
            name: 'Bill Nye',
            email: 'scienceGuy@pierson.edu',
            password: 'password',
        },
        {
            name: 'Hacksaw Jim Dueggen',
            email: 'rassling@wwf.com',
            password: 'password',
        }

    ];
    return UserModel.create(users)
})
    .then(users => {

        // Attach users to classes and create the classes
        // users 0 - 9
        var classes = [
            {
                name: 'American History',
                description: 'The history of the United States spanning from the Native Americans to present day',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Physics',
                description: 'An introduction to the laws that govern all things big and small',
                teacher: users[1]._id,
                students: users.slice(3)
            },
            {
                name: 'Greek Mythology',
                description: 'An overview of the most important characters and stories in Greek mythology',
                teacher: users[2]._id,
                students: users.slice(3)
            },
            {
                name: 'Film History',
                description: 'This is the only fun class this school has to offer',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Literature',
                description: 'See name',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Math',
                description: 'An introduction to the laws that govern all things big and small',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Computer Science',
                description: 'An overview of the most important characters and stories in Greek mythology',
                teacher: users[1]._id,
                students: users.slice(3)
            },
            {
                name: 'Phys Ed',
                description: 'This is the only fun class this school has to offer',
                teacher: users[1]._id,
                students: users.slice(3)
            },
            {
                name: 'Theater',
                description: 'See name',
                teacher: users[1]._id,
                students: users.slice(3)
            }
        ];
        return ClassModel.create(classes)
    })
    .then(classes => {
        var presentations = [
            {
                name: 'Shakespeare Shakedown',
                markdown:'# Heres some markdown about Shakespeare.\n He wrote\n*Romeo and Juliet«\n*Othello\n*MacBeth',
                class: classes[4]._id,
                owner: classes[4].teacher,
                theme: 'simple'
            },
            {
                name: 'The Native Americans',
                markdown:'# Heres some markdown about the Native Americans.',
                class: classes[0]._id,
                owner: classes[0].teacher,
                theme: 'black'
            },
            {
                name: 'To Kill a Mockingbird',
                markdown:'# Atticus Finch was a great lawyer, a great father and a great man',
                class: classes[4]._id,
                owner: classes[4].teacher
            },
            {
                name: 'Advanced Calculus',
                markdown:'# Advanced Calculus',
                class: classes[5]._id,
                owner: classes[5].teacher
            },
            {
                name: 'Communication Breakdown',
                markdown:'# Led Zeppelin.',
                class: classes[8]._id,
                owner: classes[8].teacher
            },
            {
                name: 'Compilers and Interpreters',
                markdown:"#What's going on under the hood",
                class: classes[6]._id,
                owner: classes[6].teacher
            },
            {
                name: 'Pushups',
                markdown:'# Drop and give me 20!',
                class: classes[7]._id,
                owner: classes[7].teacher
            },
            {
                name: 'Huckleberry Finn',
                markdown:'# Mark Twain and the Anti-Hero',
                class: classes[4]._id,
                owner: classes[4].teacher
            },
            {
                name: 'Orson Welles',
                markdown:"# The Highs and Lows of One of America's Greatest Actors",
                class: classes[1]._id,
                owner: classes[1].teacher
            },
            {
                name: 'An American In Paris',
                markdown:'# Those Parisians sure can dance',
                class: classes[2]._id,
                owner: classes[2].teacher
            }
        ];
        return PresentationModel.create(presentations);

    })
    .then(function(){
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function(err){
        console.error(err);
        process.kill(1);
    });

// var seedClasses = function () {
//
//     return Class.createAsync(classes);
//
// };
//
// connectToDb.then(function () {
//
//     Class.findAsync({}).then(function(classes){
//         if (classes.length === 0) {
//             return seedClasses();
//         } else {
//             console.log(chalk.magenta('Seems to already be class data, exiting!'))
//         }
//     }).then(function(classes){
//         console.log("classes", classes);
//         classes = classes;
//
//
//         return Presentation.createAsync(presentations);
//
//     }).then(function(presentations){
//         console.log("presentations", presentations);
//
//         return User.createAsync(users);
//
//     }).then(function(){
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function(err){
//         console.error(err);
//         process.kill(1);
//     });
// });
