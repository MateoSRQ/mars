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
                    if (typeof StackModule.collections[id] === 'undefined') {
                        console.log(StackModule.collections[id]);
                        StackModule.collections[id] = new App.StackModule.CollectionModel();
                        console.log(StackModule.collections[id]);
                    }
                    console.log('****');
                    console.log(id);
                    console.log(StackModule.collections[id].add);
                    
                    
                    
                    
                    StackModule.collections[id].add({name:'page_1'})
                    
                    /*
                    this.views[id] = new App.StackModule.ContainerView({id: id, collection: this.collections[id]});
                    this.manager.addRegion(id, dom);
                    this.manager.get(id).show(App.StackModule.views[id]);
                    */    
                    //App.StackModule.init();
                };
                
                StackModule.addchild = function(id, models) {
                    App.execute('debug', 'App.StackModule.addchild function called.', 0);
                    console.log(this.collections[id])
                    this.collections[id].add(models);
                    /*
                    if (typeof this.collections[id] === 'undefined') {
                        console.log('I am an error')
                    }
                    else {
                        this.collections[id].add(models);
                    }
                    */
                }
                
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

                StackModule.vent.on('App.StackModule.ContainerView.render', function(options) {
                    App.vent.trigger('App.StackModule.ContainerView.render', options);
                });
            
                
            });

            App.vent.trigger('StackModule.start');
        }
    )}
)
