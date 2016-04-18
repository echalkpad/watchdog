var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/watchdogdb');
var Schema = mongoose.Schema;

// create a schema
var applianceSchema = new Schema({
    device_id: String,
    device_name: String,
    status: String,
    channel_name: String,
    alt: String,
    image: String,
    checked: Boolean
});


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

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('watchdogdb', server);

var Appliance = mongoose.model('appliances', applianceSchema);

module.exports = Appliance;

// get all the users
Appliance.find({}, function(err, appliance) {
    if (err) throw err;
    // object of all the users
    console.log(appliance);
});

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

exports.findAll = function(req, res) {
    db.collection('appliances', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.set("Access-Control-Allow-Origin", "*");
            res.send(items);
        });
    });
};


exports.deleteApp = function(req, res) {
    var id = req.params.id;
    db.collection('appliances', function(err, coll) {
        console.log("Collection is: "+coll)
        coll.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
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
            "alt": "iphone",
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