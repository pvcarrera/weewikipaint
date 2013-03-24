/*global desc, task, jake, fail, complete */

(function() {
    "use strict";

    desc('Build and test');
    task('default', ['lint']);

    desc('Lint everything');
    task ('lint',[], function (params) {
        var lint = require('./build/lint/lint_runner.js');
        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");

        lint.validateFileList(files.toArray(), nodeLintOptions(), {});
    });

    desc('Integrate');
    task('integrate', ['default'], function(){
        console.log("Integration code goes here");
    });

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
