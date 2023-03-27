const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const db_conn = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/").get(function (req, res) {
    let db_connect = db_conn.getDb("Notes");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/").post(function (req, response) {
    let db_connect = db_conn.getDb();
    let myobj = {
        title: req.body.title,
        content: req.body.content,
    };
    db_connect
        .collection("records")
        .insertOne(myobj, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log("Add one obj", myobj)
            }
            response.json(res);
        });
});

recordRoutes.route("/:tarId").delete((req, response) => {
    console.log("Try delete", req.params);
    let db_connect = db_conn.getDb();
    let myquery = { _id: ObjectId(req.params.tarId) };
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;