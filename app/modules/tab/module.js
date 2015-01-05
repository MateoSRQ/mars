'use strict';

App.module("TabModule", function (TabModule) {
    TabModule.startWithParent = false;
    TabModule.headers = null;
    TabModule.containers = null;
    this.collection = {};
    this.views = {};
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
    //'modules/tab/views/tab_header_item',
    //'modules/tab/views/tab_container_item',
    'modules/tab/views/container',
    'modules/tab/models/item',
    
    //'css!modules/window/css/window.css'
],
    function() {
        require([
            //'modules/tab/views/tab_header_collection',
            //'modules/tab/views/tab_container_collection',
            'modules/tab/models/collection',
        ],   
        function () {
            App.module('TabModule', function (TabModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.TabModule.addInitializer function called.', 0);
                    if (this.options.id && typeof(this.options.id) !== undefined ) {
                        this.collection = new App.TabModule.Collection();
                        App.TabModule.options = this.options;
                        this.views.container = new App.TabModule.Container({ id: this.options.id, class: this.options.class });
                        App.layout.getRegion('tab_container').show(this.views.container);
                        
                        // maybe on event
                        //this.headers = new App.TabModule.TabHeaderView({collection: this.collection});
                        //this.containers = new App.TabModule.TabContainerView({collection: this.collection});
                        //App.tabHeaderRegion.show(this.headers);
                        //App.tabContainerRegion.show(this.containers);
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
                    this.collection.remove(this.collection.where(condition));
                };
            });
            
            App.vent.trigger('TabModule.start');
        }
        
    )}
)
