
# gulp-aws-codedeploy

AWS codedeploy plugin for gulp


# Example


```js
gulp.task('deploy', ['upload'], function() {

	return gulp.src('codedeploy.json')
			.pipe(codedeploy());
});
```

where parameter file looks like:

```js
{
	"applicationName": "my-webserver",
	"deploymentConfigName": "CodeDeployDefault.AllAtOnce",
	"deploymentGroupName": "my-group",
	"description": "my-description",
	"revision": {
		"revisionType": "S3",
		"s3Location": {
		  "bucket": "my-bucket",
		  "bundleType": "zip",
		  "key": "my-app-webserver.zip"
		}
	},

	"region": "eu-west-1"
}
```


