'use strict';

App.module("StackModule", function (StackModule) {
    StackModule.startWithParent = false;
    this.item = null;
    this.views = [];
    this.collections = [];
    StackModule.options = {};
    StackModule.manager = null;
    StackModule.vent = new Backbone.Wreqr.EventAggregator();
});

App.StackModule.on('before:start', function(options){
    App.execute('debug', 'App.StackModule before:start event called', 0);
    this.options = options;
});

requirejs.config({
    shim: {
        'bespoke':  { deps:[], exports: '' },
        'bespoke-classes':  { deps:['bespoke'], exports: '' },
        'bespoke-keys':  { deps:['bespoke'], exports: '' }
    },
    paths: {
        'bespoke': '../../app/modules/stack/libs/bespoke/dist/bespoke.min',
        'bespoke-classes': '../../app/modules/stack/libs/bespoke/dist/bespoke.classes.min',
        'bespoke-keys': '../../app/modules/stack/libs/bespoke/dist/bespoke.keys.min'
    }
});

require([
    'bespoke',
    'modules/stack/views/item',
    //'modules/map/models/item',
    //'css!modules/map/css/map.css',
],
    function(bespoke) {
        require([
            'modules/stack/models/collection',
            'modules/stack/views/container'
        ],   
        function () {
            App.module('StackModule', function (StackModule, App, Backbone, Marionette, $, _) {

                this.addInitializer(function(){
                    App.execute('debug', 'App.StackModule.addInitializer function called.', 0);
                    //if (this.options.id && typeof(this.options.id) !== undefined ) {
                        //this.collection = new App.StackModule.CollectionModel();
                        this.manager = new Marionette.RegionManager({});
                        //App.StackModule.options = this.options;

                    //}
                    //else {
                    //    App.execute('debug', 'App.StackModule.addInitializer: id required.', -1);
                    //}
                });
                
                StackModule.add = function(id, dom, models) {
                    App.execute('debug', 'App.StackModule.add function called.', 0);
                    console.log(id)
                    if (typeof this.collections[id] === 'undefined') {
                        this.collections[id] = new App.StackModule.CollectionModel();
                        this.views[id] = new App.StackModule.ContainerView({collection: this.collections[id]});
                        this.manager.addRegion(id, dom);
                        this.manager.get(id).show(App.StackModule.views[id]);
                    }
                    //App.StackModule.init();
                };
                
                StackModule.remove = function(condition) {
                    /*
                    App.execute('debug', 'App.StackModule.remove function called.', 0);
                    var filtered = this.collection.where(condition);
                    _.each(filtered, function(item){
                        App.StackModule.views[item.id].destroy();
                    });
                    this.collection.remove(filtered);
                    // dont forget to remove
                    */
                };


                
            });

            App.vent.trigger('StackModule.start');
        }
    )}
)
