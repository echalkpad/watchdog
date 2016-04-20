

var client_cas = require('../conf/cassandra-conf');
var fc = require('../utility/functions');
var cassandra =  require('cassandra-driver');
var async = require('async');


exports.getDeviceHealth = function(req, res){
  var payload = req.body;
  var start_date = payload.start_date;
  var end_date = payload.end_date
  var diff = payload.diff;
  var device_type = payload.device_type;

  async.waterfall([
            function(callback){
                stripe.tokens.create({
                    card:cardData
                }, function(err, token){
                    if(err) console.log(err);
                    callback(null, token.id, isDefaultSource);
                })
            },

            function(tokenId, isDefaultSource, callback) {
                stripe.customers.createSource(
                    customerId,
                    {source : tokenId},
                    function(err, card) {
                        if(err) console.log(err);
                        console.log("Customer updated with card : "+card.id)
                        if(isDefaultSource){
                            callback(null, card.id);
                        }
                    }
                )
            },

            function(cardId) {
                stripe.customers.update(
                    customerId,
                    {
                        default_source : cardId
                    }, function(err, customer) {
                        if(err) console.log(err);
                        console.log("Customer default source updated!" +cardId);
                    }
                )
            }
        ], function(err, data){
                if(err) console.log(err);
                console.log(data);
            }
        )

}

exports.addDeviceData = function(req, res) {
    var payload = req.body;
    var device_id = payload.device_id;
    var device_type = payload.device_type;
    var channel = payload.channel;
    var date = payload.date;
    var time = '2013-04-03 07:01:00';
    var value = payload.value;
    var cquery = "";
    //console.log("********TS******"+new Date());
    console.log("*****************************payload********************************"+payload);
    console.log("##############device_type###########"+device_type);
    switch(device_type){
      case "tv" : cquery = "insert into tv (device_id,device_type,channel,date,time,usage) values (?,?,?,?,?,?)"; break;
      case "refrigerator" : cquery = "insert into refrigerator (device_id,device_type,channel,date,time,temperature) values (?,?,?,?,?,?)"; break;
      case "washing_machine" : cquery = "insert into washing_machine (device_id,device_type,channel,date,time,usage) values (?,?,?,?,?,?)"; break;
      case "mobile" : cquery = "insert into mobile (device_id,device_type,channel,date,time,cpu_utilization) values (?,?,?,?,?,?)"; break;
    }

    console.log("*****************************cquery********************************"+cquery);

    //cquery = "insert into services (service_id,title,description, date_creation, duration,type) values (?,?,?,?,?,?)";

    client_cas.execute(cquery,[device_id, device_type, channel, date, new Date(), value], function (result) {
      console.log(result);
      res.send("Device data received");

    });

       // fc.afterExecution('Error: ', 'Service ' + device_id + ' created with id '+device_id, res)
    //);
}