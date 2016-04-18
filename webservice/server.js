var cors = require('cors')
var express = require('express'),
    appliances = require('./routes/appliances');

var cors = require('cors')
var app = express();
app.use(cors())
app.options('*', cors());
app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser());
});

app.get('/appliances', appliances.findAll);
app.delete('/appliances/:id', appliances.deleteApp);

app.listen(4000);
console.log('Listening on port 4000...');