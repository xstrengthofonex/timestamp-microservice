
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function isInvalidDate(date){
  if (date === undefined)
    return true;
  return date.getTime() < 0
}

function getDate(timestamp){
  var date;
  if (timestamp === undefined)
    date = new Date();
  else if (timestamp.match(/^[^-][0-9]+$/))
    date = new Date(parseInt(timestamp));
  else
    date = new Date(timestamp);
  
  if (isInvalidDate(date))
    return null;
  return date;
}

app.get("/api/timestamp/:date_string?", function(req, res) {
  var timestamp = req.params.date_string;
  var date;
  date = getDate(timestamp);
  if (date === null) 
    res.json({unix: null, utc : "Invalid String"});
  else
    res.json({unix: date.getTime(), utc: date.toUTCString()});
});


module.exports = app
