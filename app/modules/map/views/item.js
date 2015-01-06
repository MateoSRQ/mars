'use strict';

define([
    'text!modules/map/templates/item.html',
    ],
    function(item){
        App.MapModule.ItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class'));
            },
            events: {

            },
            attributes : function () {
                return {
                    
                };
            },
            template: function() {
                return _.template(item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.MapModule.ItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                
                /* TEST */
                console.log('test');
                console.log(this.model.get('id'))
                var mapHandler = new ol.Map({
                    target: 'tab_2',
                    controls: ol.control.defaults({
                        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                          collapsible: false
                        })
                      }),
                    //.extend([mousePositionControl]),
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.MapQuest({layer: 'sat'}),
                            name: 'tesla'
                        })
                    ],
                    view: new ol.View({
                        center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                        zoom: 4,
                    })
                });
                console.log(this.mapHandler);
                
                var layer = {
                    layer: new ol.layer.Tile({
                            source: new ol.source.MapQuest({layer: 'sat'}),
                            name: 'tesla'
                        }),
                    type: 'raster',
                };
                console.log(mapHandler.addLayer)
                console.log(layer)
                //mapHandler.addLayer(layer);
                
                
                
                App.MapModule.vent.trigger('App.MapModule.ItemView.render', this);
            },

            
        });
    }
);