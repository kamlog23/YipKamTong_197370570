// var Datastore = require('lowdb');
// var LodashId = require('lodash-id');
// var FileSync = require('lowdb/adapters/FileSync');
// var path = require('path');

// const adapter = new FileSync(path.join(__dirname, '../public/data.json'));

// const db = Datastore(adapter);
// db._.mixin(LodashId);

// if (!db.has('data').value()) {
//     db.set('data', []).write();
// }

// module.exports = db;
// 引入mongodb
const MongoClient = require('mongodb').MongoClient;
// 断言为下面的连接状态返回结果是true还是false准备

// Connection URL数据库连接网址
const url = 'mongodb://localhost:27017';

// Database Name数据库名，没有会自动创建
const dbName = 'class';

// Create a new MongoClient实例化这个方法
const client = new MongoClient(url);

// Use connect method to connect to the Server
// 连接数据库
client.connect(function(err) {
    // 上面的语句没有错误，则显示正确连接
    console.log("Connected successfully to server");
    // 连接database这个数据库
    const db = client.db(dbName);

    // ============数据库操作区域===================

    // 关闭数据库连接
    client.close();
    // ============数据库操作区域===================
});

function insertOne(data, callback) {
    client.connect(function(err) {
        //如果连接错误则会抛出错误，不在执行此语句的下面的语句
        if (err) {
            console.log("程序运行出错，有可能你没有使用(mongod --dnpath D:/mongod/database)打开数据库")
            return;
        }

        // 上面的语句没有错误，则显示正确连接
        console.log("Connected successfully to server");
        // 连接database这个数据库
        const db = client.db(dbName);

        // ============数据库操作区域===================
        db.collection("students").insertOne(data, function(err, result) {
            //抛出一个错误
            if (err) {
                console.log(err)
                return;
            }
            //result是所有的数据库变动信息,result以对象方式存储的，ops属性就是插入的数据
            //insertedCount属性表示插入的条目数量
            callback()

            // 关闭数据库连接
            client.close();
        });
        // ============数据库操作区域===================

    });
}

function selectData(callback) {
    client.connect(function(err) {
        //如果连接错误则会抛出错误，不在执行此语句的下面的语句
        if (err) {
            console.log("程序运行出错，有可能你没有使用(mongod --dnpath D:/mongod/database)打开数据库")
            return;
        }

        // 上面的语句没有错误，则显示正确连接
        console.log("Connected successfully to server");
        // 连接database这个数据库
        const db = client.db(dbName);

        // ============数据库操作区域===================
        db.collection("students").find().toArray(function(err, result) {
            //抛出一个错误
            if (err) {
                console.log(err)
                return;
            }
            console.log("成功查询了" + result.length + "条信息");
            // 查询所有的JSON将会放在result这个数组里面
            callback(result);
            // 关闭数据库连接
            client.close();
        });
        // ============数据库操作区域===================

    });
}

function findData(data, callback) {
    client.connect(function(err) {
        //如果连接错误则会抛出错误，不在执行此语句的下面的语句
        if (err) {
            console.log("程序运行出错，有可能你没有使用(mongod --dnpath D:/mongod/database)打开数据库")
            return;
        }

        // 上面的语句没有错误，则显示正确连接
        console.log("Connected successfully to server");
        // 连接database这个数据库
        const db = client.db(dbName);

        // ============数据库操作区域===================
        db.collection("students").find(data).toArray(function(err, result) {
            //抛出一个错误
            if (err) {
                console.log(err)
                return;
            }
            console.log("成功查询了" + result.length + "条信息");
            // 查询所有的JSON将会放在result这个数组里面
            callback(result);
            // 关闭数据库连接
            client.close();
        });
        // ============数据库操作区域===================

    });
}

function deleteMany(data, callback) {
    client.connect(function(err) {
        //如果连接错误则会抛出错误，不在执行此语句的下面的语句
        if (err) {
            console.log("程序运行出错，有可能你没有使用(mongod --dnpath D:/mongod/database)打开数据库")
            return;
        }

        // 上面的语句没有错误，则显示正确连接
        console.log("Connected successfully to server");
        // 连接database这个数据库
        const db = client.db(dbName);

        // ============数据库操作区域===================
        db.collection("students").deleteMany(data, function(err, result) {
            //抛出一个错误
            if (err) {
                console.log(err)
                return;
            }
            //deletedCount 属性表示删除的条目数量
            console.log("成功删除了" + result.deletedCount + "条数据");
            callback()
                // 关闭数据库连接
            client.close();
        });
        // ============数据库操作区域===================
    });
}

function replaceOne(oldData, newData, callback) {
    client.connect(function(err) {
        //如果连接错误则会抛出错误，不在执行此语句的下面的语句
        if (err) {
            console.log("程序运行出错，有可能你没有使用(mongod --dnpath D:/mongod/database)打开数据库")
            return;
        }

        // 上面的语句没有错误，则显示正确连接
        console.log("Connected successfully to server");
        // 连接database这个数据库
        const db = client.db(dbName);

        // ============数据库操作区域===================
        db.collection("students").replaceOne(oldData, newData, function(err, result) {
            //抛出一个错误
            if (err) {
                console.log(err)
                return;
            }
            console.log("成功匹配" + result.matchedCount + "个,一共修改了" + result.modifiedCount + "个")
                // 关闭数据库连接
            client.close();
        });
        // ============数据库操作区域===================
    });
}

module.exports = { insertOne, selectData, findData, deleteMany, replaceOne }