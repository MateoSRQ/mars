'use strict';

App.module("TabModule", function (TabModule) {
    TabModule.startWithParent = false;

    this.collection = {};
    this.views = {};
    TabModule.manager = null;
    TabModule.options = {};
    TabModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.TabModule.on('before:start', function(options){
    App.execute('debug', 'App.TabModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
    },
    paths: {
    }
});

require([
    'modules/tab/views/header_item',
    'modules/tab/views/panel_item',
    'modules/tab/views/container',
    'modules/tab/models/item',
    
    //'css!modules/window/css/window.css'
],
    function() {
        require([
            'modules/tab/views/header_container',
            'modules/tab/views/panel_container',
            'modules/tab/models/collection',
        ],   
        function () {
            App.module('TabModule', function (TabModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.TabModule.addInitializer function called.', 0);
                    if (this.options.id && typeof(this.options.id) !== undefined ) {
                        this.collection = new App.TabModule.CollectionModel();
                        this.manager = new Marionette.RegionManager({});
                        App.TabModule.options = this.options;
                        this.views.container = new App.TabModule.ContainerView({ id: this.options.id, class: this.options.class });
                        App.layout.getRegion('tab_container').show(this.views.container);
                    }
                    else {
                        App.execute('debug', 'App.TabModule.addInitializer: id required.', -1);
                    }
                });

                TabModule.add = function(models) {
                    App.execute('debug', 'App.TabModule.add function called.', 0);
                    this.collection.add(models);
                };
                
                TabModule.remove = function(condition) {
                    App.execute('debug', 'App.TabModule.remove function called.', 0);
                    var filtered = this.collection.where(condition);
                    this.collection.remove(filtered);
                    _.each(filtered, function(item){
                       App.TabModule.manager.removeRegion(item.get('id')); 
                    });
                };
            });
            
            App.TabModule.vent.on('App.TabModule.ContainerView.render', function(options){
                App.execute('debug', 'App.TabModule.ContainerView.render function called.', 0);
                App.vent.trigger('App.TabModule.ContainerView.render', options);
            });
            
            App.TabModule.vent.on('App.TabModule.PanelItemView.render', function(options){
                App.execute('debug', 'App.TabModule.PanelItemView.render function called.', 0);
                App.vent.trigger('App.TabModule.PanelItemView.render', options);
            });
            
            App.vent.trigger('TabModule.start');
        }
        
    )}
)
