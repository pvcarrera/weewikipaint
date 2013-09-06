"use strict";

var http = require("http");
var server = http.createServer();

exports.start = function(portNumber){

  server.on("request", function(request, response){
    response.end("Hello World");
  });

  server.listen(portNumber);
};

exports.stop = function(callback){
  server.close(callback);
};
