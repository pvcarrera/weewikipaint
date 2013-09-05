"use strict";

var http = require("http");
var server = http.createServer();

exports.start = function(){

  server.on("request", function(request, response){
    response.end();
  });

  server.listen(8080);
};

exports.stop = function(callback){
  server.close(callback);
};
