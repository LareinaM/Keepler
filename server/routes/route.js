require("dotenv").config({ path: "./config.env" });
const express = require("express");
const recordRoutes = express.Router();
const mongoose = require("mongoose");
const _ = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const UserModel = mongoose.model('user', UserSchema);

const NoteSchema = new Schema({
    title: String,
    content: String,
    modifiedDate: String,
    color: String,
    userID: String,
});
const NoteModel = mongoose.model('note', NoteSchema);

// This section will help you get a list of all the records.
recordRoutes.route("/")
    .post(function (req, response) {
        const newNote = new NoteModel(req.body);
        NoteModel.insertMany([newNote])
            .then(res => {
                console.log(newNote);
                response.json(res);
            })
            .catch(err => {
                throw err;
            });
    })
    .get(function (req, res) {
        NoteModel.find({ $or: [{ userID: { $exists: false } }, { userID: null }] })
            .then(foundNotes => {
                res.json(foundNotes);
            })
            .catch(err => {
                throw err;
            });
    });

recordRoutes.route("/signup")
    .post(function (req, response) {
        const newUser = new UserModel(req.body);
        UserModel.insertMany([newUser])
            .then(res => {
                response.json(res);
            })
            .catch(err => {
                throw err;
            });
    });

recordRoutes.route("/login")
    .post(function (req, response) {
        UserModel.findOne({ email: req.body.email })
            .then(foundUser => {
                if (foundUser.password === req.body.password) {
                    response.json({ validate: "success" });
                } else {
                    response.json({ validate: "failure" });
                }
            })
            .catch(err => {
                throw err;
            });
    });

recordRoutes.route("/:tarId")
    .delete((req, response) => {
        NoteModel.deleteMany({ _id: ObjectId(req.params.tarId) })
        .then(obj => {
            response.json(obj);
        })
        .catch(err => {
            throw err;
        });
    });

recordRoutes.route("/update/:id")
    .post((req, response) => {
        console.log(req.params);
        NoteModel.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
        .then(res => {
            console.log("1 obj updated", req.params.id, res);
            response.json(res);
        })
        .catch(err => {
            throw err;
        });
    });

module.exports = recordRoutes;