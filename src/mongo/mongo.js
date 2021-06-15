import mongodb from 'mongodb'

export default class Mongo {
    constructor(url) {
        this.url = url
    }
    start() {
        mongodb.MongoClient.connect(this.url, function (err, db) {
            if (err) throw err;
            db.close();
        });
    }
    createCollection() {

        mongodb.MongoClient.connect(this.url, function (err, db) {
            if (err) throw err;

            let dbo = db.db("sokoban-database")
            dbo.createCollection("score", function (err, res) {
                //if (err) throw err;
                db.close();
            });
        });


    }
    insertRecord(scoreRecord) {
        mongodb.MongoClient.connect(this.url, function (err, db) {
            if (err) throw err;

            let dbo = db.db("sokoban-database")
            dbo.collection("score").insertOne(scoreRecord, function (err, res) {
                if (err) throw err;
                console.log("1 score inserted");
                db.close();
            });
        });
    }
    getRecords() {

        mongodb.MongoClient.connect(this.url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("sokoban-database")
            dbo.collection("score").find({}).toArray(function (err, result) {
                if (err) throw err;
                GLOBALdata = result
                console.log(GLOBALdata);
                db.close();
            });
        });

    }

}