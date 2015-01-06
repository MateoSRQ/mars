'use strict';
console.clear();

require([
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
            el: 'body',
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
                { id: 'tab_1', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item active', options: {  } },
                { id: 'tab_2', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
                { id: 'tab_3', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
                { id: 'tab_4', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
                { id: 'tab_5', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
                { id: 'tab_6', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
                { id: 'tab_7', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } },
                { id: 'tab_8', name: 'This is a big one', panel_class: 'tab_panel', tab_class: 'tab_item', options: {  } }
            ]);
            App.TabModule.remove({
                id: 'tab_3'
            })
            
            App.execute('load', 'map', 'MapModule', {});
            
            $('#tab_1').html('HOLA');
            $('#tab_2').html('COMO ESTAS');
            
            
        });
        
        App.vent.on('MapModule.start', function(options){
            App.execute('debug', 'MapModule.start event called.', 0);
            /*
            App.MapModule.add([
                { id: 'map_1', class: 'map_item', options: { region: App.TabModule.manager.get('tab_1') }},
                { id: 'map_2', class: 'map_item', options: { region: App.TabModule.manager.get('tab_2') }}
            ]);
            /*
            App.MapModule.remove({
                id: 'map_2'
            })
            */
        });

        
        require([

        ], function() {
            App.start();

            require([
                
            ], function(){
                App.execute('load', 'tab', 'TabModule', {id: 'tab_container', class: 'tab_container'});
               
            })
        })
    }
);
