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
                this.layers = [];
                this.controls = [];
                this.select =  null;
                this.popup = null;
                this.selectSingleClick = null;

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
                if (!this.mapHandler) {
                    this.mapHandler = new ol.Map({
                        renderer: 'canvas',
                        target: this.model.get('id'),
                        controls: ol.control.defaults({
                            attributionOptions:  ({
                              collapsible: false
                            })
                          }),
    
                        layers: [
<<<<<<< HEAD

                        ],
                        view: new ol.View({
                            center: ol.proj.transform(this.model.get('center'), 'EPSG:4326', 'EPSG:3857'),
                            extent: ol.proj.transform(this.model.get('extent'), 'EPSG:4326', 'EPSG:3857'),
                            minZoom: this.model.get('minzoom'),
                            maxZoom: this.model.get('maxzoom'),
                            zoom: this.model.get('zoom'),
=======
                            new ol.layer.Tile({
                                source: new ol.source.MapQuest({layer: 'osm'}),
                                name: 'tesla'
                            }),
                            /*
                            new ol.layer.Tile({
                                source: new ol.source.XYZ({
                                    url: 'http://127.0.0.1/tileserver/mbtiles/geography-class/{z}/{x}/{y}.png',
                                    //extent: extent,
                                    minZoom: 6,
                                    maxZoom: 13,
                                    tilePixelRatio: 1
                                })
                            })
                            */
                        ],
                        view: new ol.View({
                            center: ol.proj.transform(this.model.get('options').center, 'EPSG:4326', 'EPSG:3857'),
                            zoom: this.model.get('options').zoom,
>>>>>>> parent of 8978933... REFACTORING ALL
                        })
                    });
                    
                    // Popup showing the position the user clicked
                    /*
                    this.popup = new ol.Overlay({
                        element: document.getElementById('popup')
                    });
                    this.mapHandler.addOverlay(this.popup);                    
                    
                    // demo
                    var self = this;
                    this.mapHandler.on('click', function(evt) {
                        self.clicked = evt.coordinate;
                        var element = self.popup.getElement();
                        $(element).popover('destroy');
                    });
                    */
                }
            },
            
            _createTopoJSONLayerfromLocal: function(layerName, options) {
                App.execute('debug', 'App.MapModule.ItemView._createTopoJSONLayerfromLocal function called.', 0);
                if (this.layers[layerName] !== null) {
                    var self = this;
                    require([
                    ], function (){
                        var urldata= null;
                        $.ajax({
                            dataType: "json",
                            async: false,
                            url: options.data_url,
                            data: '',
                            success: function(r) {
                                urldata = r;
                            }
                        });
                        var GeoJSONReader = new ol.format.GeoJSON();
<<<<<<< HEAD
                        var _features = GeoJSONReader.readFeatures(options.urldata);
=======
                        var _features = GeoJSONReader.readFeatures(urldata);
>>>>>>> parent of 8978933... REFACTORING ALL
                        var quantile = d3.scale.quantile()
                        .domain(_.compact(_.map(_features, function(feature){  return numeral(feature.get(options.value))._value; })))
                        .range(options.colors);
                        
                        App.camelCase = function(str) {
                            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                        }
                        
                        var nn = function(feature, resolution) {
                            return new ol.style.Text({
                                //text: App.camelCase(feature.get('nombre')),
                                font: ' bold 13px Roboto',
                                
                                fill: new ol.style.Stroke({
                                    color: '#000',
                                    width: 6
                                }),
                                stroke: new ol.style.Stroke({
                                    color: 'white',
                                    width: 2
                                })                                      
                            });
                        }
                        
                        var styleFunction = function(feature, resolution) {
                            return  [
                                new ol.style.Style({
                                    fill: new ol.style.Fill({
                                        color: quantile(numeral(feature.get(options.value))._value)
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: quantile(numeral(feature.get(options.value))._value), //'#319FD3',
                                        width: 0.2
                                    }),
                                    text: nn(feature, resolution)
                                })
                            ];
                        };

                        self.layers[layerName] = {
                            layer: new ol.layer.Vector({
                                opacity: 0.7,
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
<<<<<<< HEAD

                       
=======
                        

                        
>>>>>>> parent of 8978933... REFACTORING ALL
                    self.mapHandler.addLayer(self.layers[layerName].layer);
                    })
                    /* check */
                    var selectedStyleFunction = function(feature, resolution) {
                        return  [new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(33,150,243,0.1)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'rgba(33,150,243,0.7)',
                                width: 0.5
                            })
                        })];
                    };
                    
                    /*
                    this.selectSingleClick = new ol.interaction.Select({
                    });
                    var selected_features = this.selectSingleClick.getFeatures();
                    
                    selected_features.on('add', function(f){
                        numeral.language('fr');
                        var element = self.popup.getElement();
                        var coordinate = self.clicked;
                        self.popup.setPosition(coordinate);
                        // the keys are quoted to prevent renaming in ADVANCED mode.
                        $(element).popover({
                            'placement': 'top',
                            'animation': false,
                            'html': true,
                            'content': '<div>' + App.camelCase(f.element.get('nombre')) + '</div>' + '<p>PIA: S./' + numeral(f.element.get('pia')).format('0,0.00') + '</p><p>PIM: S./' + numeral(f.element.get('pim')).format('0,0.00') + '</p>',
                        });
                        $(element).popover('show');
                    })
                    
                    this.mapHandler.addInteraction(this.selectSingleClick);
                    */
                    }
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
<<<<<<< HEAD
            */
            _createTileLayer: function(layerName, options) {
=======
            
            _createMapQuestSatelliteLayer: function(layerName, options) {
>>>>>>> parent of 8978933... REFACTORING ALL
                App.execute('debug', 'App.MapModule.ItemView._createMapQuestSatelliteLayer function called.', 0);
                
                if (this.layers[layerName] !== null) {
                    this.layers[layerName] = {
                        layer: new ol.layer.Tile({
                            source: new ol.source.XYZ({
                                url: 'http://127.0.0.1/tileserver/OSMBright/{z}/{x}/{y}.png',
                                extent: ol.proj.transform([-82.5732,-19.4977,-67.2803,1.6038], 'EPSG:4326', 'EPSG:3857'),
                                minZoom: 6,
                                maxZoom: 12,
                                tilePixelRatio: 1
                            }),
                            name: layerName
                        }),
                        type: 'raster'
                    };
                    this.mapHandler.addLayer(this.layers[layerName].layer);
                    App.MapModule.vent.trigger('App.MapModule.ItemView._createTileLayer', this);
                }
                else {
                    // PUT ERROR
                }
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
            
            // shouldn't hide, must delete
            hideLayers: function(bool) {
                for(var layer in this.layers){
                    this.layers[layer].layer.set('visible', bool);
                };
            },
            
            createLayer: function(type, layerName, options) {
                App.execute('debug', 'App.MapModule.ItemView.createLayer function called.', 0);
                
                this.hideLayers(false);
                
                if (typeof this.layers[layerName] === 'undefined') {
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
                        case 'tile_layer':
                            this._createTileLayer(layerName, options);
                            break;
                        default:
                            // PUT ERROR
                            break;
                    }
                    App.MapModule.vent.trigger('App.MapModule.ItemView.createLayer', this);
                }
                else {
                    this.layers[layerName].layer.set('visible', true);
                    
                    App.execute('debug', 'App.MapModule.ItemView.createLayer not used.', 0);
                    //this.layers[layerName].set(visible, value)
                }
            },
            
            createControl: function(type, controlName, options){
                App.execute('debug', 'App.MapModule.ItemView.createControl function called.', 0);
                if (typeof this.controls[controlName] === 'undefined') {
                    switch(type) {
                        case 'select':
                            this._createSelectControl(controlName, options);
                            break;
                    }
                }
                else {
                }
            },
            
            _createSelectControl: function(controlName, options) {
                App.execute('debug', 'App.MapModule.ItemView._createSelectControl function called.', 0);                
                this.controls[controlName] = new ol.interaction.Select({});
                this.mapHandler.addInteraction(this.controls[controlName]);
            }
            
            
        });
    }
);