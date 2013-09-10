"use strict";

var http = require("http");
var server = http.createServer();

exports.start = function(portNumber){
  if(!portNumber) throw new Error("port number is required");

  server.on("request", function(request, response){
    response.end("Hello World");
  });

  server.listen(portNumber);
};

exports.stop = function(callback){
  server.close(callback);
};
