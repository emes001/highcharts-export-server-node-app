'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const exporter = require('highcharts-export-server');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Set up a pool of PhantomJS workers
exporter.initPool();

// App
const app = express();

// Middleware

// Parse request data with content-type application/json
app.use(bodyParser.json());
// Parse request data with content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  // A happy little route that will inform us things are up and running. :)

  var response = {
    message: "Hello from the NodeJS Highcharts Export Server!",
    date: new Date()
  };

  res.json(response);
});

app.post('/', (req, res) => {

  // Grab parameters from request, setting defaults if necessary
  var chartType     = 'png';
  var chartOptions  = req.body.options;
  var chartScale    = req.body.scale || 1;

  console.debug("Perform an export with the following parameters", "chart type", chartType, "options", chartOptions, "scale", chartScale)

  if (!chartOptions) {
    res.status(400).send("Bad Request - missing 'options' parameter.");
    return
  }

  //Export settings 
  var exportSettings = {
    type: chartType,
    options: chartOptions,
    scale: chartScale
  };

  //Perform an export
  exporter.export(exportSettings, function (err, chartRes) {
      //The export result is now in res.
      //If the output is not PDF or SVG, it will be base64 encoded (res.data).
      //If the output is a PDF or SVG, it will contain a filename (res.filename).

      var imageData = chartRes.data;

      var img = new Buffer(imageData, 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img); 
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

process.on('exit', function() {
  // Kill the pool of PhantomJS worker processes if this process dies
  exporter.killPool();
});