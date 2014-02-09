module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: './public/lib'
				}
			}
		},
		concat: {
			options: {
    			// define a string to put between each file in the concatenated output
    			separator: ';'
			},
			dist: {
    			// the files to concatenate
    			src: [
    				'public/lib/jquery/jquery.js',
    				'public/lib/bootstrap/bootstrap.js'
    			],
    			// the location of the resulting JS file
    			dest: 'public/lib/blog.js'
			}
		}
}); 

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat']);
};