/*global desc, task, jake, fail, complete, directory */

(function() {
    "use strict";
    var GENERATED_DIR = "generated";
    var TEMP_TESTFILE_DIR = GENERATED_DIR + "/test";

    directory (TEMP_TESTFILE_DIR);

    desc('Delete all temporary files');
    task("clean", [], function(){
        jake.rmRf(GENERATED_DIR);
    });

    desc('Build and test');
    task('default', ["lint", "test"]);

    desc('Lint everything');
    task ('lint',['node'], function (params) {
        var lint = require('./build/lint/lint_runner.js');
        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");

        var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
        if(!passed) fail("Lint failed!");
    });

    desc('Test everything');
    task('test', ['node', TEMP_TESTFILE_DIR], function(){
        var reporter =require("nodeunit").reporters["default"];
        reporter.run(['src/server/_server_test.js'], null, function(failures){
            if (failures) fail("Test failed");
            complete();
        });
    }, {async: true});

    desc('Integrate');
    task('integrate', ['default'], function(){
        console.log("1. Make sure 'git status' is clean.");
        console.log("2. Build on the integration box");
        console.log("   a. Walk over the integration box");
        console.log("   b. 'git pull'");
        console.log("   c. 'jake'");
        console.log("   d. If jake fails, stop! Try again after fixing the issue!");
        console.log("3. 'git checkout the integration'");
        console.log("4. 'git merge master --no-ff --log'");
        console.log("5. 'git checkout master'");
    });

    // desc('Ensure correct version of node is present');
    task('node',[], function() {
      var NODE_VERSION = 'v0.10.13\n';

      sh("node --version", function(stdout){
        if(stdout !== NODE_VERSION) fail("Incorrect version. Expected " + NODE_VERSION);
        complete();
      });
    }, {async: true});

    function sh(command, callback){
        console.log('> ' + command);

        var stdout = "";
        var process = jake.createExec(command, {printStdout:true, printStderr:true});
        process.on('stdout', function(chunk){
            stdout += chunk;
        });
        process.on('cmdEnd', function(){
          console.log();
          callback(stdout);
        });
        process.run();
    }

    function nodeLintOptions() {
        return{
            bitwise: true,
            curly: false,
            forin: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
            node: true
        };
    }
}());
