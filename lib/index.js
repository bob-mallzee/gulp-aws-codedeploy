
const through = require('through2');
const AWS = require('aws-sdk');
const gutil = require('gulp-util');

// Consts
const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-aws-codedeploy';


/**
 * DEPLOY
 */
const codeDeploy = function () {

	// Creating a stream through which each file will pass
	return through.obj(function(file, enc, cb) {

        // no file, do nothing
        if (file.isNull()) {
          return cb();
        }

        // stream not supported
        if (file.isStream()) {
        	var msg = 'Stream content is not supported';
    		this.emit('error', new gutil.PluginError(PLUGIN_NAME, msg));
    		return cb(new Error(msg));
      	}

        // if buffer use it as parameter
        if (file.isBuffer()) {

            try {
                var params = JSON.parse(file.contents.toString());
            }
            catch (e) {
                var msg = 'Cannot read properties file or not JSON';
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, msg));
                return cb(new Error(msg));
            }

            // check region
            if (!params.region) {
                var msg = 'Parameters must contain "region" field';
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, msg));
                return cb(new Error(msg));
            }

    		// create deployer
    	    var codedeploy = new AWS.CodeDeploy({region : params.region});
            delete params.region;

            // deploy
    		return codedeploy.createDeployment(params, function(err, data) {

                // write response
                if (!err) {
                    console.log('response', data);
                }

    			cb(err, data);
    		});
        }

        cb(null, file);

    });
}

module.exports = codeDeploy;