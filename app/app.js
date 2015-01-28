'use strict';
require([
    'marionette',
    'backbone_associations'
], function(Marionette){
    window.App = new Backbone.Marionette.Application({});

    require([
        'configuration',
        'material_design',
        //'scrollbar',
        'numeral',
        'numeral_language',
        'velocity',
        'css!css_bootstrap/bootstrap.min.css',
        'css!css_bootstrap/paper.min.css',
        'css!css_bootstrap/roboto/font_roboto.css',
        'css!fonts/miu/flaticon.css',
        //'css!css_scrollbar/perfect-scrollbar.min.css'
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
                App.execute('debug', 'App.before:start event called.', 0);
            });
            
            App.vent.on('loading', function(){
                App.execute('debug', 'App.loading event called.', 0);
                $('#loading').velocity({
                    backgroundColorAlpha: 1
                }, 0);
                $('#loading .loader').velocity({
                    opacity: 1
                }, 0);
                $('#loading').css('pointerEvents', 'all');

            });
            
            App.vent.on('loaded', function(){
                App.execute('debug', 'App.loaded event called.', 0);
                $('#loading').velocity({
                    backgroundColorAlpha: 0
                }, 1000);
                $('#loading .loader').velocity({
                    opacity: 0
                }, 1500);
                $('#loading').css('pointerEvents', 'none');

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

                App.TabModule.add(App.Configuration.models);
                App.execute('load', 'map', 'MapModule', {});
            });
            
            App.vent.on('MapModule.start', function(options){
                App.execute('debug', 'MapModule.start event called.', 0);                
                var _maps = App.Configuration.pluck('map');
                
                _.each(_maps, function(i){
                    i.set('region', App.TabModule.manager.get(i.get('region')));
                })
                
                App.MapModule.add(_maps);
                App.MapModule.init('map_1');
                
                _.each(_maps, function(i){
                    var _layer = i.get('layer')
                    var _parent = i.get('id')
                    if (typeof _layer !== 'undefined') {
                        App.MapModule.createLayer(_parent, _layer.get('type'), _layer.get('id'), {});
                    }
                })
                
                
                
                /*
                $.ajax({
                    dataType: "json",
                    //async: false,
                    url: 'http://127.0.0.1/data/test.geojson',
                    data: '',
                    success: function(r) {
                        App.MapModule.createLayer('map_1', 'local_json', 'map_1_departamentos_pia', {
                            urldata: r,
                            colors: ['#ffffcc','#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
                            value: 'pia',       
                            center: [-75,-10.50],
                            zoom: 5
                        });
                        App.vent.trigger('loaded');
                    }
                });
                */
                App.vent.trigger('loaded');
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
                ]);
                
                var region = App.StackModule.getRegion('stack_1', 'page_1_1', 'headerRegion');
                region.show(new App.StackModule.MyView())
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
                    case 'tab_1':
                            App.vent.trigger('loading');
                            App.vent.trigger('loaded');
                        break;
                    case 'tab_2':
                        App.vent.trigger('loading');
                        $('#tab_2').addClass('active');
                        App.MapModule.init('map_2');
                        $.ajax({
                            dataType: "json",
                            //async: false,
                            url: 'http://127.0.0.1/data/peru_provincias.json',
                            data: '',
                            success: function(r) {
                                /* TEST */
        
                                App.MapModule.createLayer('map_2', 'local_json', 'map_2_provincias_pia', {
                                    //data_url: ,
                                    urldata: r,
                                    colors: ['#ffffcc','#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
                                    center: [-75,-10.50],
                                    value: 'comprometido',
                                    zoom: 7
                                });
                                App.MapModule.createControl('map_2', 'select', {});
                                App.vent.trigger('loaded');
                            }
                        });

                        
                    break;
                case 'tab_3':
                        App.vent.trigger('loading');
                        $('#tab_3').addClass('active');
                        App.MapModule.init('map_3');
                        $.ajax({
                            dataType: "json",
                            //async: false,
                            url: 'http://127.0.0.1/data/cusco_distritos.json',
                            data: '',
                            success: function(r) {
                                /* TEST */
        
                                App.MapModule.createLayer('map_3', 'local_json', 'map_3_comprometido', {
                                    //data_url: ,
                                    urldata: r,
                                    colors: ['#a6cee3','#1f78b4','#b2df8a','#33a02c'],
                                    center: [-75,-10.50],
                                    value: 'comprometido',
                                    zoom: 9
                                });
                                App.vent.trigger('loaded');
                            }
                        });

                        
                    break;
                }
            });
            
            App.vent.on('App.StackModule.MyView.select_option', function(options){
                App.execute('debug', 'App.StackModule.MyView.select_option function called', 0);
                App.vent.trigger('loading');
                
                $('#selector li').removeClass('active');
                $($($(options.currentTarget)[0])).parent().addClass('active');


                
                var _type = $($('#selector li.active a')[0]).attr('rel');
                var _terr = $($('#selector2 li.active a')[0]).attr('rel');
                 console.log('url: ' + 'map_1', 'local_json', 'map_1_' + _terr + '.json');
                
                console.log(_type);
                App.StackModule.switchState('stack_1');


                $.ajax({
                    dataType: "json",
                    //async: false,
                    url: 'http://127.0.0.1/data/peru_' + _terr +  '.json',
                    data: '',
                    success: function(r) {
                        /* TEST */

                        App.MapModule.createLayer('map_1', 'local_json', 'map_1_' + _terr + '_' + _type, {
                            //data_url: ,
                            urldata: r,
                            colors: ['#ffffcc','#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
                            center: [-75,-10.50],
                            value: _type,
                            zoom: 7
                        });
                        App.vent.trigger('loaded');
                    }
                });

            });
            
            
            App.vent.on('App.StackModule.MyView.select2_option', function(options){
                App.execute('debug', 'App.StackModule.MyView.select2_option function called', 0);
                $('#loader').velocity({
                    opacity: 1
                }, 0);
                
                $('#selector2 li').removeClass('active');
                $($($(options.currentTarget)[0])).parent().addClass('active');


                
                var _type = $($('#selector li.active a')[0]).attr('rel');
                var _terr = $($('#selector2 li.active a')[0]).attr('rel');
                
                console.log('url2: ' + 'map_1', 'local_json', 'map_1_' + _terr + '.json');
                
                
                console.log(_type);
                App.StackModule.switchState('stack_1');
                
              $.ajax({
                    dataType: "json",
                    //async: false,
                    url: 'http://127.0.0.1/data/peru_' + _terr +  '.json',
                    data: '',
                    success: function(r) {
                        /* TEST */

                        App.MapModule.createLayer('map_1', 'local_json', 'map_1_' + _terr + '_' + _type, {
                            //data_url: ,
                            urldata: r,
                            colors: ['#ffffcc','#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
                            center: [-75,-10.50],
                            value: _type,
                            zoom: 7
                        });
                        App.vent.trigger('loaded');
                    }
                });
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

