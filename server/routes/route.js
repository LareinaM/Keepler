//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb')

const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'Live long and prosper',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    googleId: String
});
UserSchema.plugin(passportLocalMongoose);

const UserModel = new mongoose.model('User', UserSchema);
passport.use(UserModel.createStrategy());

// create cookie and store
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// destroy cookie
passport.deserializeUser(function (id, done) {
    UserModel.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err, null);
        });
});

const NoteSchema = new Schema({
    title: String,
    content: String,
    modifiedDate: String,
    color: String,
    task: String,
    userID: String,
});
const NoteModel = new mongoose.model('note', NoteSchema);


// This section will help you get a list of all the records.
app.route('/logout')
    .get(function (req, res) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

app.route('/')
    // add record
    .post(function (req, response) {
        const newNote = new NoteModel(req.body);
        NoteModel.insertMany([newNote])
            .then(res => {
                response.json(res);
            })
            .catch(err => {
                throw err;
            });
    });
app.route('/get/:selectedTask')
    // get record
    .get(function (req, res) {
        // TODO
        // console.log("getting", req.isAuthenticated());
        // console.log(req.user);
        var currTask = req.params.selectedTask;
        var otherOpt =  currTask == 'TODAY' ? undefined : ''
        if (req.isAuthenticated()) {
            console.log("isAuthenticated");
            NoteModel.find({ task: req.params.selectedTask, userID: '123' })
                .then(foundNotes => {
                    res.json(foundNotes);
                })
                .catch(err => {
                    throw err;
                });
        } else {// $or: [{  }, {task: otherOpt}]
            NoteModel.find({task: currTask , $or: [{ userID: { $exists: false } }, { userID: null }] })
                .then(foundNotes => {
                    res.json(foundNotes);
                })
                .catch(err => {
                    throw err;
                });
        }
    })

app.route('/signup')
    .post(function (req, res) {
        UserModel.register(
            new UserModel({ username: req.body.username }),
            req.body.password,
            function (err, user) {
                if (err) {
                    res.json({ signup: 'failure' });
                } else {
                    passport.authenticate('local')(req, res, function () {
                        res.json({ signup: 'success' });
                    })
                }
            });
    });

app.route('/login')
    .post(function (req, res) {
        // console.log("upon req", req.user);
        // console.log("body", req.body);
        const user = new UserModel(req.body);
        // var result = {};
        req.login(user, function (err) {
            if (err) {
                res.json({ login: 'failure' });
            } else {
                passport.authenticate('local')(req, res, function () {
                    res.json({ login: 'success' });
                })
            }
        });
        // console.log("req", req.user); //=> yes
    });

app.route('/:tarId')
    .delete((req, res) => {
        console.log('deleting ', req.params.tarId);
        NoteModel.deleteMany({ _id: ObjectId(req.params.tarId) })
            .then(obj => {
                res.json(obj);
            })
            .catch(err => {
                throw err;
            });
    });

app.route('/update/:id')
    .post((req, response) => {
        NoteModel.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
            .then(res => {
                console.log('1 obj updated', req.params.id, res);
                response.json(res);
            })
            .catch(err => {
                throw err;
            });
    });

module.exports = app;