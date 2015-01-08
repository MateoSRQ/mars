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
            template: function(model) {
                return _.template(item)({
                    panel_id: model.options.panel_id                
                })
            },
            onRender: function(){
                App.execute('debug', 'App.MapModule.ItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                App.MapModule.vent.trigger('App.MapModule.ItemView.render', this);
            },
            
            init: function() {
                this.mapHandler = new ol.Map({
                    target: this.model.get('id'),
                    controls: ol.control.defaults({
                        attributionOptions:  ({
                          collapsible: false
                        })
                      }),

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
            }
            
            

            
        });
    }
);