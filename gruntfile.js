module.exports = function(grunt) {

	// project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		"babel": {
		    options: {
		      sourceMap: true
		    },
		    dist: {
		      files: {
		        "dist/app.js": "src/index.js"
		      }
		    }
		  }
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask('default', ['babel']);
}