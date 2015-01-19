'use strict';
console.clear();
require([
    'marionette' 
], function(Marionette){
    window.App = new Backbone.Marionette.Application({});

    require([
        'material_design',
        'scrollbar',
        'css!css_bootstrap/bootstrap.min.css',
        'css!css_bootstrap/paper.min.css',
        'css!css_bootstrap/roboto/font_roboto.css',
        'css!fonts/miu/flaticon.css',
        'css!css_scrollbar/perfect-scrollbar.min.css'
    ],
        function () {
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
                    { id: 'tab_1', name: 'Mapa departamental', panel_class: 'tab_panel active', tab_class: 'tab_item active', options: {  } },
                    { id: 'tab_2', name: 'Mapa provincial',    panel_class: 'tab_panel',        tab_class: 'tab_item',        options: {  } },
                    { id: 'tab_3', name: 'Mapa distrital',     panel_class: 'tab_panel',        tab_class: 'tab_item',        options: {  } }
                ]);
                App.execute('load', 'map', 'MapModule', {});
            });
            
            App.vent.on('MapModule.start', function(options){
                App.execute('debug', 'MapModule.start event called.', 0);
                
                App.MapModule.add([
                
                    { id: 'map_1', class: 'map_item', options: { region: App.TabModule.manager.get('tab_1'), panel_id: 'panel_1', panel_class: 'panel_stack coverflow', panel_target: 'stack_1', center: [-75,-10.50], zoom: 5 }},
                    { id: 'map_2', class: 'map_item', options: { region: App.TabModule.manager.get('tab_2'), panel_id: 'panel_2', panel_class: 'panel_stack', panel_target: 'stack_2', center: [-75,-10.50], zoom: 5  }},
                    { id: 'map_3', class: 'map_item', options: { region: App.TabModule.manager.get('tab_3'), panel_id: 'panel_3', panel_class: 'panel_stack', panel_target: 'stack_3', center: [-75,-10.50], zoom: 5  }}
                ]);

                
                App.MapModule.init('map_1');
                App.MapModule.createLayer('map_1', 'local_json', 'local_json', {
                    data_url: 'http://127.0.0.1/server/web/data/location?by=DEPARTAMENTO',
                    colors: ['#a6cee3','#1f78b4','#b2df8a','#33a02c'],
                    center: [-75,-10.50],
                    zoom: 5
                });
                
                App.execute('load', 'stack', 'StackModule', {});


               
            });
            
            App.vent.on('StackModule.start', function(options){
                App.execute('debug', 'StackModule.start event called.', 0);
                
                
                App.StackModule.add(
                    'stack_1',
                    '#panel_1',
                    [
                    { id: 'stack_1', class: 'stack_item well', options: { }}
                    ]
                );
                App.StackModule.addchild('stack_1', [
                    { id: 'page_1_1' },
                    { id: 'page_1_2' },
                    { id: 'page_1_3' },
                    { id: 'page_1_4' },
                    { id: 'page_1_5' },
                    { id: 'page_1_6' },
                    { id: 'page_1_7' },
                    { id: 'page_1_8' },
                ])
                
                App.StackModule.init('stack_1');
            });
            
            /* TAB RENDERED */
            App.vent.on('App.TabModule.PanelItemView.render', function(options){
                App.execute('debug', 'App.TabModule.PanelItemView.render event called.', 0);
            });
    
            App.vent.on('App.StackModule.ContainerView.render', function(options){
                App.execute('debug', 'App.StackModule.ContainerView.render', 0);
            });
            
            App.vent.on('App.MapModule.ItemView.panel_button_click', function(options){
                App.execute('debug', 'App.MapModule.ItemView.panel_button_click', 0);
                App.StackModule.vent.trigger('App.MapModule.ItemView.panel_button_click', options);
            });
            
            // TAB HEADER CLICKED
            App.vent.on('App.TabModule.HeaderItemView.header_item_click', function(options){
                App.execute('debug', 'App.TabModule.HeaderItemView.header_item_click', 0);

                switch (options.model.get('id')) {
                    
                    case 'tab_2':
                        $('#tab_2').addClass('active');
                        App.MapModule.init('map_2');
                        App.MapModule.createLayer('map_2', 'local_json', 'local_json', {
                            data_url: 'http://127.0.0.1/server/web/data/location?by=PROVINCIA',
                            colors: ['#ffffcc','#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
                            center: [-75,-10.50],
                            zoom: 7
                        });
                    break;
                case 'tab_3':
                        $('#tab_3').addClass('active');
                        App.MapModule.init('map_3');
                        App.MapModule.createLayer('map_3', 'local_json', 'local_json', {
                            data_url: 'http://127.0.0.1/server/web/data/location?by=DISTRITO',
                            colors: ['#a6cee3','#1f78b4','#b2df8a','#33a02c'],
                            center: [-75,-10.50],
                            zoom: 9
                        });
                    break;
                }
//
            });            
            

            
            
            require([
            ], function() {
                App.start();
                require([
                ], function(){
                    App.execute('load', 'tab', 'TabModule', {id: 'tab_container', class: 'tab_container tabs-below'});
                })
            })
        }
    );
});

