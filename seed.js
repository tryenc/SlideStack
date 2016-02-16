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
            name: 'Sam Narisi',
            email: 'sam@fsa.com',
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
                name: 'JavaScript 101',
                description: 'An introduction to key language concepts.',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Compilers',
                description: 'This course will discuss the major ideas used today in the implementation of programming language compilers, including lexical analysis, parsing, syntax-directed translation, abstract syntax trees, types and type checking, intermediate languages, dataflow analysis, program optimization, code generation, and runtime systems.',
                teacher: users[1]._id,
                students: users.slice(3)
            },
            {
                name: 'Operating Systems',
                description: 'The topics covered include a review of linkers and loaders and the high-level design of key operating systems concepts such as process scheduling and synchronization; deadlocks and their prevention; memory management, including (demand) paging and segmentation; and I/O and file systems, with examples from Unix/Linux and Windows. Programming assignments may require C, C++, Java, or C#.',
                teacher: users[2]._id,
                students: users.slice(3)
            },
            {
                name: 'Software Engineering',
                description: 'This is a capstone course focusing on large-scale software development. This course presents modern software engineering techniques and examines the software life cycle, including software specification, design, implementation, testing, and maintenance. Object-oriented design methods are also considered. Software engineering projects involve creation of a large-scale software system and require some or all of the following elements: formation of a small team, project proposal, literature review, interim report, project presentation, and final report.',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Linear Algebra',
                description: 'Linear algebra is the branch of mathematics concerning vector spaces and linear mappings between such spaces. It includes the study of lines, planes, and subspaces, but is also concerned with properties common to all vector spaces.',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'Networks And Mobile Systems',
                description: 'A course in computer networks and large-scale distributed systems. Teaches the design and implementation techniques essential for engineering both robust networks and Internet-scale distributed systems. The goal is to guide students so they can initiate and critique research ideas in networks and distributed systems and implement and evaluate a working system that can handle a real-world workload. Topics include routing protocols, network congestion control, wireless networking, peer-to-peer systems, overlay networks and applications, distributed storage systems, and network security.',
                teacher: users[0]._id,
                students: users.slice(3)
            },
            {
                name: 'The History of Computer Science',
                description: 'An introduction to key concepts from Turing to the present.',
                teacher: users[1]._id,
                students: users.slice(3)
            },
            {
                name: 'Intro to Object-Oriented Programming',
                description: 'A language-agnostic introduction to the OOP philosophy.',
                teacher: users[1]._id,
                students: users.slice(3)
            }
        ];
        return ClassModel.create(classes)
    })
    .then(classes => {
        var presentations = [
            {
                name: 'Responsive Design with Bootstap',
                markdown:'# Heres some markdown about Shakespeare.\n He wrote\n*Romeo and Juliet«\n*Othello\n*MacBeth',
                class: classes[4]._id,
                owner: classes[4].teacher,
                theme: 'simple'
            },
            {
                name: 'Functional Programming in JavaScript',
                markdown:'# Heres some markdown about the Native Americans.',
                class: classes[0]._id,
                owner: classes[0].teacher,
                theme: 'black'
            },
            {
                name: 'The V8 Engine',
                markdown:'# Atticus Finch was a great lawyer, a great father and a great man',
                class: classes[4]._id,
                owner: classes[4].teacher
            },
            {
                name: 'Advanced Angular Directives',
                markdown:'# Advanced Calculus',
                class: classes[5]._id,
                owner: classes[5].teacher
            },
            {
                name: 'JavaScript Promises',
                markdown:'# Led Zeppelin.',
                class: classes[3]._id,
                owner: classes[3].teacher
            },
            {
                name: 'Compilers and Interpreters',
                markdown:"#What's going on under the hood",
                class: classes[6]._id,
                owner: classes[6].teacher
            },
            {
                name: 'OOP in JavaScript',
                markdown:'# Drop and give me 20!',
                class: classes[7]._id,
                owner: classes[7].teacher
            },
            {
                name: 'WebAssembly',
                markdown:'# Mark Twain and the Anti-Hero',
                class: classes[4]._id,
                owner: classes[4].teacher
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
