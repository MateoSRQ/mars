'use strict';
define([
    'text!modules/tab/templates/container.html',
    ],
    function(container){
        App.TabModule.Container  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.options.id);
                this.$el.prop('class', this.options.id);
            },
            events: {

            },
            attributes : function () {
                return {
                    'role': 'tabpanel'
                };
            },
            template: function() {
                return _.template(container)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.TabModule.Container.onRender event called.', 0);
                /*
                App.addRegions({
                    'tabHeaderRegion': '#tab_header',
                    'tabContainerRegion': '#tab_container'
                })
                */
                App.TabModule.vent.trigger('TabModule.Container.render', this);
            },

            
        });
    }
);