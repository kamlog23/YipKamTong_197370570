var express = require('express');
var router = express.Router();
var db = require('./db.js');

/* GET users listing. */
router.post('/', function(req, res, next) {
    let body = req.body;
    db.findData({ user: body.user }, exist => {
        if (!exist) {
            res.send("Account does not exist!");
        } else if (exist.password !== body.password) {
            res.send("Wrong account or password!");
        } else {
            res.send("success");
        }
    });
});

router.post('/addUser', function(req, res, next) {
    let body = req.body;
    db.findData({ user: body.user }, exist => {
        if (exist) {
            res.send("Account already exists!");
        } else {
            db.insertOne(body).write();
            res.send("success");
        }
    });
});

router.get('/getAdmin/:user', function(req, res, next) {
    let user = req.params.user;
    db.findData({ user }, data => {
        if (data) {
            res.send(data.admin + '');
        } else {
            res.send();
        }
    });
});

module.exports = router;