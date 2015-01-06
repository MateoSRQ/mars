'use strict';

App.module("MapModule", function (MapModule) {
    MapModule.startWithParent = false;
    this.item = null;
    this.views = {};
    MapModule.options = {};
    MapModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.MapModule.on('before:start', function(options){
    App.execute('debug', 'App.MapModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
        'ol': { deps: [], exports: 'ol' }
    },
    paths: {
        'ol': '../../app/modules/map/libs/openlayers/build/ol-debug', // change in production!
        'css_ol': '../../app/modules/map/libs/openlayers/css/ol.css'
    }
});

require([
    'ol',
    'modules/map/views/item',
    'modules/map/models/item',
    'css!modules/map/css/map.css',

    
],
    function(ol) {
        require([
        'modules/map/models/collection'
        ],   
        function () {
            App.module('MapModule', function (MapModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.MapModule.addInitializer function called.', 0);
                    //if (this.options.id && typeof(this.options.id) !== undefined ) {
                        this.collection = new App.MapModule.CollectionModel();

                        
                        App.MapModule.options = this.options;

                    //}
                    //else {
                    //    App.execute('debug', 'App.MapModule.addInitializer: id required.', -1);
                    //}
                    
                });
                
                MapModule.add = function(models) {
                    App.execute('debug', 'App.MapModule.add function called.', 0);
                    this.collection.add(models);
                    this.collection.each(function(item){
                        App.MapModule.views[item.get('id')] = new App.MapModule.ItemView({model: item});
                        item.get('options').region.show(App.MapModule.views[item.get('id')]);
                    });
                };
                
                MapModule.remove = function(condition) {
                    App.execute('debug', 'App.MapModule.remove function called.', 0);
                    var filtered = this.collection.where(condition);
                    _.each(filtered, function(item){
                        App.MapModule.views[item.id].destroy();
                    });
                    this.collection.remove(filtered);
                    // dont forget to remove
                };
            });

            App.vent.trigger('MapModule.start');
        }
    )}
)
