'use strict';
console.clear();

require([
    //'backbone_relational',
    'marionette',
    'material_design',
    'css!css_bootstrap/bootstrap.min.css',
    'css!css_bootstrap/paper.min.css',
    'css!css_bootstrap/roboto/font_roboto.css',
    //'css!css_material_design/material.min.css'
],
    function (Marionette) {
        window.App = new Backbone.Marionette.Application({
        });
        
        App.LayoutView = Backbone.Marionette.LayoutView.extend({
            el: '#app-container',
            template: '#app-template',
            regions: {
                tab_container: "#tab_container_region"
            }
        });

        App.commands.setHandler('debug', function(text, level){
            if (level == -1) {
                console.error('debug: ' + text);
            }
            else {
                if (level >=  window.debug){
                    console.log('debug: ' + text);
                }
            }
        });
        
        App.commands.setHandler('load', function(dirname, module, options){
            App.execute('debug', 'App.commands.setHandler() called.', 0);
            if (!eval('App.' + module)) {
                require([
                    'modules/' + dirname + '/module',
                ], function() {
                    eval('App.' + module + '.start(options);');
                });    
            }
        });
        
        App.on('before:start', function(options){
            App.execute('debug', 'App before:start event called.', 0);
        });
        
        App.on('start', function(options){
            App.execute('debug', 'App.start event called.', 0);
            
            App.layout = new App.LayoutView();
            if (Backbone.history){
                Backbone.history.start();
                App.execute('debug', 'App.history started', 0); 
            }
            App.layout.render();
        });

        App.vent.on('TabModule.start', function(options){
            App.execute('debug', 'TabModule.start event called.', 0);
            App.TabModule.add([
                { id: 'tab_1', name: 'Mapa de información', panel_class: 'tab_panel active', tab_class: 'tab_item active', options: {  } },
                { id: 'tab_2', name: 'Mapa de datos', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
            ]);
            App.execute('load', 'map', 'MapModule', {});
        });
        
        App.vent.on('MapModule.start', function(options){
            App.execute('debug', 'MapModule.start event called.', 0);
            App.MapModule.add([
                { id: 'map_1', class: 'map_item', options: { region: App.TabModule.manager.get('tab_1'), panel_id: 'panel_1', panel_class: 'panel_stack' }},
                { id: 'map_2', class: 'map_item', options: { region: App.TabModule.manager.get('tab_2'), panel_id: 'panel_2', panel_class: 'panel_stack' }}
            ]);

            App.MapModule.init('map_1');
            App.MapModule.init('map_2');
            App.execute('load', 'stack', 'StackModule', {});
        });
        
        App.vent.on('StackModule.start', function(options){
            App.execute('debug', 'StackModule.start event called.', 0);

            App.StackModule.add(
                'stack_1',
                '#panel_1',
                [
                { id: 'stack_1', class: 'stack_item', options: { }}
                ]
            );
            App.StackModule.addchild('stack_1', [
                { id: 'page_1_1' },
                { id: 'page_1_2' },
                { id: 'page_1_3' },
                { id: 'page_1_4' },
            ])
            
            /*
            console.log(App);
            console.log(App.StackModule);
            console.log(App.StackModule.collections);
            console.log(App.MapModule.collection);

            App.StackModule.init('stack_1')
            */
        });
        
        /* TAB RENDERED */
        App.vent.on('App.TabModule.PanelItemView.render', function(options){
            App.execute('debug', 'App.TabModule.PanelItemView.render event called.', 0);
        });

        App.vent.on('App.StackModule.ContainerView.render', function(options){
            App.execute('debug', 'App.StackModule.ContainerView.render', 0);
            console.log(options);
            if (options.$el.attr('id') == 'stack_1') {
                App.StackModule.addchild('stack_1', [
                    { id: 'card_1'},
                    { id: 'card_2' }
                ]);                
            }
        });
        
        require([

         ], function() {
            App.start();
            require([

            ], function(){
                App.execute('load', 'tab',   'TabModule', {id: 'tab_container', class: 'tab_container tabs-below'});
            })
        })
    }
);
