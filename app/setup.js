'use strict';
window.App = null;
window.debug = 0;

requirejs.config({
    baseUrl: 'libs/requirejs',
    waitSeconds: 30,
    shim: {
        'jquery':  { deps: [] },
        'underscore': { deps: [], exports: ['_'] },
        'backbone': { deps: ['underscore', 'jquery'], exports: ['Backbone'] },
        'backbone_relational': { deps: ['backbone'] },
        'marionette': { deps: ['backbone'], exports:  ['Marionette']},
        'bootstrap': { deps: ['jquery'] },
        'material_design': { deps: ['bootstrap'] },
            
        'app': { deps: ['marionette'] }
    },
    paths: {
        'jquery': '../jquery/jquery-2.1.1.min',
        'underscore': '../underscore/underscore-1.7.0.min',
        'backbone': '../backbone/backbone-1.1.2.min',
        'backbone_relational': '../backbone/backbone.relational.min',
        'marionette': '../marionette/marionette-2.3.0.min',

        
        'bootstrap': '../bootstrap/dist/js/bootstrap.min',
        'css_bootstrap': '../bootstrap/dist/css',
        'material_design': '../material_design/bootstrap-material-design-master/dist/js/material.min',
        'css_material_design': '../material_design/bootstrap-material-design-master/dist/css',
        /*
        
        'css_font-awesome': '../font-awesome',
        */
        'app': '../../app/app',
        'modules': '../../app/modules',
        'models': '../../app/models',
        
        'fonts': '../../libs/fonts'
    }
});

requirejs.onResourceLoad = function (context, map, depArray) {
    if (!window.debug) {
        console.log('[' + map.name + '] resource loaded!');
    }
    
}


