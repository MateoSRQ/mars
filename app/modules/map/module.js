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
    },
    paths: {
    }
});

require([
    'modules/map/views/item',
    'modules/map/models/item',
    
    'css!modules/map/css/map.css'
],
    function() {
        require([
        'modules/map/models/collection'
        ],   
        function () {
            App.module('MapModule', function (MapModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.MapModule.addInitializer function called.', 0);
                    //if (this.options.id && typeof(this.options.id) !== undefined ) {
                        this.collection = new App.MapModule.CollectionModel();
                        //this.collection.bind('add', this.renderRows, this);  
                        // collection events
                        
                        App.MapModule.options = this.options;
                        //this.views.container = new App.MapModule.ContainerView({ id: this.options.id, class: this.options.class });
                        //App.layout.getRegion('tab_container').show(this.views.container);
                    //}
                    //else {
                    //    App.execute('debug', 'App.MapModule.addInitializer: id required.', -1);
                    //}
                    
                });
                
                MapModule.add = function(models) {
                    App.execute('debug', 'App.MapModule.add function called.', 0);
                    this.collection.add(models);
                    // should be collection
                    this.collection.each(function(item){
                        console.log('item');
                        console.log(item);
                        App.MapModule.views[item.get('id')] = new App.MapModule.ItemView({model: item});
                        item.get('options').region.show(App.MapModule.views[item.get('id')]);
                    });
                };
                
                MapModule.remove = function(condition) {
                    App.execute('debug', 'App.MapModule.remove function called.', 0);
                    var filtered = this.collection.where(condition);
                    this.collection.remove(filtered);
                    // dont forget to remove
                };
            });
            /*
            App.MapModule.vent.on('App.MapModule.ContainerView.render', function(options){
                App.execute('debug', 'App.MapModule.ContainerView.render function called.', 0);
                //this.views.panels = new App.MapModule.PanelContainerView({collection: this.collection});
                //console.log('PANELS!!!')
                //App.vent.trigger('App.MapModule.ContainerView.render', this);
            });
            */
            App.vent.trigger('MapModule.start');
        }
    )}
)
