'use strict';

define([
    'text!modules/map/templates/item.html',
    ],
    function(item){
        App.MapModule.ItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            layers: [],
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class'));
            },
            events: {
                'click .panel_button': 'panel_button_click'
            },
            attributes : function () {
                return {
                    
                };
            },
            template: function(model) {
                return _.template(item)({
                    panel_id: model.options.panel_id,
                    panel_class: model.options.panel_class,
                    panel_target: model.options.panel_target
                })
            },
            onRender: function(){
                App.execute('debug', 'App.MapModule.ItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                App.MapModule.vent.trigger('App.MapModule.ItemView.render', this);
            },
            
            panel_button_click: function (e) {
                App.execute('debug', 'App.MapModule.ItemView.panel_button_click event called.', 0);
                App.MapModule.vent.trigger('App.MapModule.ItemView.panel_button_click', $(e.currentTarget).attr('rel'));
            },
            
            init: function() {
                this.mapHandler = new ol.Map({
                    renderer: 'canvas',
                    target: this.model.get('id'),
                    controls: ol.control.defaults({
                        attributionOptions:  ({
                          collapsible: false
                        })
                      }),

                    layers: [
                        
                        /*
                        new ol.layer.Tile({
                            source: new ol.source.MapQuest({layer: 'osm'}),
                            name: 'tesla'
                        }),
                        */
                        new ol.layer.Tile({
                            source: new ol.source.XYZ({
                                url: 'http://127.0.0.1/tileserver/mbtiles/geography-class/{z}/{x}/{y}.png',
                                //extent: extent,
                                minZoom: 6,
                                maxZoom: 13,
                                tilePixelRatio: 1
                            })
                        })
                    ],
                    view: new ol.View({
                        center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                        zoom: 4,
                    })
                });
            },
            
            _injectJSON: function(source, source_root, source_key, source_value, dest, dest_root, dest_key, dest_value) {
                App.execute('debug', 'App.MapModule.ItemView._injectJSON function called.', 0);
                
                var _source = null;
                var _sourcetree = null;
                var _dest = null;
                var _desttree = null;
                _source = source;
                _dest = dest;
                
                if (typeof source !== 'object') {
                    _source = JSON.parse(source);
                }
                if (typeof dest !== 'object') {
                    _dest = JSON.parse(dest);
                }
                eval('_desttree = _dest.' +  dest_root);
                _.each(_desttree, function(item){
                    var _val = JSON.search(_source, '//data[IDDPTO="' + item.properties.IDDPTO + '"]');
                    _val = _val[0].VALUE;
                    item.properties.value = _val;
                })
                eval('_dest.' + dest_root + ' = _desttree');
                return _dest;
            },
            
            _createTopoJSONLayerfromLocal: function(layerName, options) {
                App.execute('debug', 'App.MapModule.ItemView._createTopoJSONLayerfromLocal function called.', 0);
                var self = this;
                require([
                    'text!' + options.url
                ], function (urldata){
                    var topoJSONReader = new ol.format.TopoJSON();
                    
                    var source = {
                        'data': [
                            {'IDDPTO': '01', 'VALUE': 500 },
                            {'IDDPTO': '02', 'VALUE': 0 },
                            {'IDDPTO': '03', 'VALUE': 0 },
                            {'IDDPTO': '04', 'VALUE': 0 },
                            {'IDDPTO': '05', 'VALUE': 0 },
                            {'IDDPTO': '06', 'VALUE': 200 },
                            {'IDDPTO': '07', 'VALUE': 0 },
                            {'IDDPTO': '08', 'VALUE': 0 },
                            {'IDDPTO': '09', 'VALUE': 0 },
                            {'IDDPTO': '10', 'VALUE': 0 },
                            {'IDDPTO': '11', 'VALUE': 300 },
                            {'IDDPTO': '12', 'VALUE': 0 },
                            {'IDDPTO': '13', 'VALUE': 0 },
                            {'IDDPTO': '14', 'VALUE': 588 },
                            {'IDDPTO': '15', 'VALUE': 0 },
                            {'IDDPTO': '16', 'VALUE': 100 },
                            {'IDDPTO': '17', 'VALUE': 0 },
                            {'IDDPTO': '18', 'VALUE': 800 },
                            {'IDDPTO': '19', 'VALUE': 0 },
                            {'IDDPTO': '20', 'VALUE': 0 },
                            {'IDDPTO': '21', 'VALUE': 400 },
                            {'IDDPTO': '22', 'VALUE': 0 },
                            {'IDDPTO': '23', 'VALUE': 0 },
                            {'IDDPTO': '24', 'VALUE': 0 },
                            {'IDDPTO': '25', 'VALUE': 1000 }
                        ]
                    };
                    
                    var data = self._injectJSON(
                        source,
                        null,
                        'IDDPTO',
                        'VALUE',
                        urldata,
                        'objects.distritos_3856_s100.geometries',
                        'properties.IDDPTO',
                        'properties.value'
                    );

                    var _features = topoJSONReader.readFeatures(data);

                    var quantile = d3.scale.quantile()
                    .domain(_.compact(_.map(_features, function(feature){ return feature.get('value'); })))
                    .range(options.colors);

                    var styleFunction = function(feature, resolution) {
                        return  [new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: quantile(feature.get('value'))
                            }),
                            stroke: new ol.style.Stroke({
                                color: quantile(feature.get('value')), //'#319FD3',
                                width: 0.5
                            })
                        })];
                    };
                    
                    self.layers[layerName] = {
                        layer: new ol.layer.Vector({
                            opacity: 0.5,
                            source: new ol.source.Vector({
                                projection: 'EPSG:3857',
                                features: _features
                            }),
                            style: function(feature, resolution) {
                                return styleFunction(feature, resolution);
                            }
                        }),
                        type: 'vector',
                    };   
                    self.mapHandler.addLayer(self.layers[layerName].layer);
                })                     
            },
            
            _createD3FromTopoJSON :function(layerName, options) {
                App.execute('debug', 'App.MapModule.ItemView._createD3FromTopoJSON function called.', 0);
                var self = this;

                d3.json(options.url, function(error, data) {

                    var features = topojson.feature(data, data.objects.distritos_4326_1000x);
                    
                    var canvasFunction = function(extent, resolution, pixelRatio, size, projection) {
                        var canvasWidth = size[0];
                        var canvasHeight = size[1];
                        var canvas = d3.select(document.createElement('canvas'));
                        canvas.attr('width', canvasWidth).attr('height', canvasHeight);
                        var context = canvas.node().getContext('2d');
                        var d3Projection = d3.geo.mercator().scale(1).translate([0, 0]);
                        var d3Path = d3.geo.path().projection(d3Projection);
                        var pixelBounds = d3Path.bounds(features);
                        var pixelBoundsWidth = pixelBounds[1][0] - pixelBounds[0][0];
                        var pixelBoundsHeight = pixelBounds[1][1] - pixelBounds[0][1];
                        var geoBounds = d3.geo.bounds(features);
                        var geoBoundsLeftBottom = ol.proj.transform(geoBounds[0], 'EPSG:4326', projection);
                        var geoBoundsRightTop = ol.proj.transform(geoBounds[1], 'EPSG:4326', projection);
                        var geoBoundsLeftBottom = geoBounds[0];
                        var geoBoundsRightTop = geoBounds[1];                            
                        
                        var geoBoundsWidth = geoBoundsRightTop[0] - geoBoundsLeftBottom[0];
                        if (geoBoundsWidth < 0) {geoBoundsWidth += ol.extent.getWidth(projection.getExtent());}
                        var geoBoundsHeight = geoBoundsRightTop[1] - geoBoundsLeftBottom[1];
                        var widthResolution = geoBoundsWidth / pixelBoundsWidth;
                        var heightResolution = geoBoundsHeight / pixelBoundsHeight;
                        var r = Math.max(widthResolution, heightResolution);
                        var scale = r / (resolution / pixelRatio);
                    
                        var center = ol.proj.transform(ol.extent.getCenter(extent), projection, 'EPSG:4326');
                        d3Projection.scale(scale).center(center).translate([canvasWidth / 2, canvasHeight / 2]);
                        d3Path = d3Path.projection(d3Projection).context(context);
                        d3Path(features);
                        context.stroke();
                        return canvas[0][0];
                    };
                    self.layers[layerName] = new ol.layer.Image({
                        source: new ol.source.ImageCanvas({
                            canvasFunction: canvasFunction,
                            projection: 'EPSG:4326',
                            name: layerName
                        })
                    });
                    self.mapHandler.addLayer(self.layers[layerName]);
                });
            },
            
            _createMapQuestSatelliteLayer: function(layerName, options) {
                App.execute('debug', 'App.MapModule.ItemView._createMapQuestSatelliteLayer function called.', 0);
                
                if (this.layers[layerName] !== null) {
                    this.layers[layerName] = {
                        layer: new ol.layer.Tile({
                            source: new ol.source.MapQuest({layer: 'sat'}),
                            name: layerName
                            }),
                        type: 'raster'
                    };
                    this.mapHandler.addLayer(this.layers[layerName].layer);
                    App.MapModule.vent.trigger('App.MapModule.ItemView._createMapQuestSatelliteLayer', this);
                }
                else {
                    // PUT ERROR
                }
            },
            
            createLayer: function(type, layerName, options) {
                App.execute('debug', 'App.MapModule.ItemView.createLayer function called.', 0);
                    switch(type) {
                        case 'mapquest_sat':
                            this._createMapQuestSatelliteLayer(layerName, options);
                            break;
                        case 'local_json':
                            this._createTopoJSONLayerfromLocal(layerName, options);
                            break;
                        case 'local_d3_json':
                            this._createD3FromTopoJSON(layerName, options);
                            break;
                        default:
                            // PUT ERROR
                            break;
                    }
                App.MapModule.vent.trigger('App.MapModule.ItemView.createLayer', this);
            }
        });
    }
);