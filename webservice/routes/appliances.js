var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});

db = new Db('watchdogdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'watchdogdb' database");
        db.collection('appliances', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'appliances' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('appliances', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.set("Access-Control-Allow-Origin", "*");
            res.send(items);
        });
    });
};


exports.deleteApp = function(req, res) {
   // db.close;
    console.log("Req method is: "+req.method)
    var id = req.params.id;
    console.log("Device id is: "+typeof id)
    db.open(function(err,db){
    db.collection('appliances', function (err, coll) {
           // console.log("Collection is: " + JSON.stringify(coll));
        coll.remove({device_id: parseInt(id)}, function (err, result) {
                if (err) {
                    res.send({'error': 'An error has occurred - ' + err});
                } else {
                    res.send("Document deleted");
                    console.log('' + result + ' document(s) deleted');

                }
            });
        });
    });
};

exports.addApp = function(req, res) {
    var app = req.body;
    console.log("Appliance: "+app.device_id)
    db.collection('appliances', function(err, collection) {
        collection.insert(app, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send(result[0]);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var appliances = [
        {
            "device_id": 1,
            "device_name": "My iphone",
            "status": "active",
            "channel_name": "ch1",
            "alt": "iphone",
            "image": "glyph stroked app-window",
            "checked": false

        },
        {
            "device_id": 2,
            "device_name": "My iphone",
            "status": "active",
            "channel_name": "ch1",
            "device_info": "iphone",
            "image": "glyph stroked app-window",
            "checked": false

        },
        {
            "device_id": 3,
            "device_name": "My iphone",
            "status": "active",
            "channel_name": "ch1",
            "alt": "iphone",
            "image": "glyph stroked app-window",
            "checked": false
        }
    ];

    db.collection('appliances', function(err, collection) {
        collection.insert(appliances, {safe:true}, function(err, result) {});
    });

};