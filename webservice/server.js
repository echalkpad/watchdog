var bodyParser = require('body-parser')
var cors = require('cors')
var express = require('express'),
    appliances = require('./routes/appliances');

var cors = require('cors')
var app = express();
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());

app.get('/appliances', appliances.findAll);
app.delete('/appliances/:id', appliances.deleteApp);
app.post('/appliances', appliances.addApp);
app.listen(4000);

console.log('Listening on port 4000...');