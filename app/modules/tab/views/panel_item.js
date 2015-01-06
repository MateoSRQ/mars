'use strict';

define([
    'text!modules/tab/templates/panel_item.html',
    ],
    function(panel_item){
        App.TabModule.PanelItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('class')+ ' tab-pane');
            },
            events: {

            },
            attributes : function () {
                return {
                    'role': 'tabpanel'
                };
            },
            template: function() {
                return _.template(panel_item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.TabModule.PanelItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                App.TabModule.manager.addRegion(this.model.get('id'), '#' + this.model.get('id'));
                App.TabModule.vent.trigger('App.TabModule.PanelItemView.render', this);
            },

            
        });
    }
);