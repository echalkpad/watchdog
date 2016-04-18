

var client_cas = require('../conf/cassandra-conf');
var fc = require('../utility/functions');
var cassandra =  require('cassandra-driver');


exports.getDeviceData = function(req, res) {
  console.log("************************channel******************"+req.params.channel);
  cquery = "select * from refrigerator where channel='"+req.params.channel+"'";

  console.log("*****************************cquery********************************"+cquery);
  client_cas.execute(cquery, function (err, result) {
    if (typeof result === 'undefined')
      console.log("No Data");
    else {
      if (result.rows.length === 0) {
        console.log("No Data");
        res.send("No Data for this channel");
      }
      else {
        console.log("********************** RESULT*****************"+result);
        res.send(result);
        // AlljsonServices='[';

        // for (var i = 0; i < result.rows.length; i++) {

        //   service = result.rows[i];

        //   jsonService = '{ '
        //   + '"service_id" : "'+ service.service_id + '", '
        //   + '"title" : "'+ service.title + '", '
        //   + '"description" : "'+ service.description + '", '
        //   + '"date_creation" : "'+ service.date_creation + '", '
        //   + '"duration" : "'+ service.duration + '", '
        //   + '"type" : "'+ service.type + '", '
        //   + '"usage_date" : "'+ service.usage_date + '", '
        //   + '"username" : "'+ service.username + '"},';

        //   AlljsonServices=AlljsonServices+jsonService;
        // }

        // AlljsonServices=AlljsonServices.slice(0, - 1)+']';

        // return reply(AlljsonServices);
      }
    }

  });
}



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