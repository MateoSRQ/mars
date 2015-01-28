module.exports = {
    bundle: {
        main: {
            scripts: [
                './libs/marionette/foo.js',
                './content/js/baz.js'
            ],
            //styles: './content/**/*.css'
        },
        vendor: {
            scripts: './bower_components/angular/angular.js'
        }
    },
    copy: './content/**/*.{png,svg}'
};