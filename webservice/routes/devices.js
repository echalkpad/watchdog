

var client_cas = require('../conf/cassandra-conf');
var fc = require('../utility/functions');
var cassandra =  require('cassandra-driver');


exports.addDeviceData = function(req, res) {
    var payload = req.body;
    var device_id = payload.device_id;
    var device_type = payload.device_type;
    var channel = payload.channel;
    var date = payload.date;
    var value = payload.value;
    var cquery = "";
    console.log("*****************************payload********************************"+payload);

    switch(device_type){
      case "tv" : cquery = "insert into tv (device_id,device_type,channel,date,time,usage) values (?,?,?,?,?,?)"; break;
      case "refrigerator" : cquery = "insert into refrigerator (device_id,device_type,channel,date,time,temperature) values (?,?,?,?,?,?)"; break;
      case "washing_machine" : cquery = "insert into washing_machine (device_id,device_type,channel,date,time,usage) values (?,?,?,?,?,?)"; break;
      case "mobile" : cquery = "insert into mobile (device_id,device_type,channel,date,time,cpu_utilization) values (?,?,?,?,?,?)"; break;
    }

    console.log("*****************************cquery********************************"+cquery);

    //cquery = "insert into services (service_id,title,description, date_creation, duration,type) values (?,?,?,?,?,?)";

    client_cas.execute(cquery,[device_id, device_type, channel, date, new Date(), value], function (result) {
      // body...
      res.send("Device data received");

    });

       // fc.afterExecution('Error: ', 'Service ' + device_id + ' created with id '+device_id, res)
    //);
}