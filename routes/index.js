var express = require('express');
var router = express.Router();
var db = require('./db.js');
const fs = require('fs');

/* GET home page. */

router.get('/getData', function(req, res, next) {
    // let data = db.read().get('data').value();
    db.selectData((data) => {
        res.send(data);
    })
});

router.get('/getData/:name', function(req, res, next) {
    let name = req.params.name;
    let data = [];
    // db.read().get('data').value().forEach(result => {
    //         if (result.name.indexOf(name) > -1) {
    //             data.push(result);
    //         }
    //     })
    //     // let data = db.read().get('data').find({ name }).value();
    // res.send(data);
    db.selectData((results) => {
        results.forEach(result => {
            if (result.name.indexOf(name) > -1) {
                data.push(result);
            }
        })
        res.send(data);
    })
});

router.post('/addData', function(req, res, next) {
    let body = Object.assign({}, req.body, {
        status: 'sale',
        editable: false
    });
    if (!body.price) {
        body.price = 1;
    }
    // let exist = db.read().get('data').find({ name: body.name }).value();
    db.findData({ name: body.name }, (data) => {
        if (!data) {
            db.insertOne(body, () => {});
            db.selectData((data) => {
                res.send(data);
            })
        } else {
            res.send('The menu name is repeated. Please re-enter the menu name!')
        }
    })

});

router.delete('/deleteData/:id', function(req, res, next) {
    // db.read().get('data').remove({ id: req.params.id }).write();
    // let data = db.read().get('data').value();
    // res.send(data);
    db.deleteMany({ id: req.params.id }, () => {});
    db.selectData((data) => {
        res.send(data);
    })
})

router.delete('/deleteAllData/:data', function(req, res, next) {
    let data = req.params.data.split(',');
    data.forEach(sel => {
        db.deleteMany(sel, () => {});
    })
    db.selectData((data) => {
        res.send(data);
    })
})

router.put('/updateData', function(req, res, next) {
    let { time, name, windows, type, price = 1, status, id } = req.body;
    // db.read().get('data').find({ id }).assign(Object.assign({}, { time, name, windows, type, price, status, id }, {
    //     editable: false
    // })).write();
    // let resData = db.read().get('data').value();
    // res.send(resData);
    db.findData({ id }, (data) => {
        db.replaceOne(data, Object.assign({}, { time, name, windows, type, price, status, id }, {
            editable: false
        }), () => {
            db.selectData((data1) => {
                res.send(data1);
            })
        })
    })
})

router.put('/updateDataStatus', function(req, res, next) {
    let id = req.body.id;
    // db.read().get('data').update({ id, editable: true }).write();
    // let resData = db.read().get('data').value();
    // res.send(resData);
    db.findData({ id }, (data) => {
        db.replaceOne(data, Object.assign({}, { editable: true }), () => {
            db.selectData((data1) => {
                res.send(data1);
            })
        })
    })
})

module.exports = router;