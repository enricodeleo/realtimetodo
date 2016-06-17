module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
      dest: '.tmp/public',
      js_dest: '.tmp/public/js/dependencies',
      css_dest: '.tmp/public/styles',
      fonts_dest: '.tmp/public'
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};
