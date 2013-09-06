"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function(done){
  server.stop(function(){
    done();
  });
};

exports.test_serverReturnsHelloWorld = function(test){
  server.start();//TODO remove duplication?
  var request = http.get("http://localhost:8080");
  request.on("response", function(response){
    var receivedDate = false;
    response.setEncoding("utf8");

    test.equals(200, response.statusCode, "status code");
    response.on("data", function(chunk){
      receivedDate = true;
      test.equals("Hello World", chunk, "respose text");
    });

    response.on("end", function(){
      test.ok(receivedDate, "should have received response data");
      test.done();
    });
  });

};

