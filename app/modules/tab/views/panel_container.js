'use strict';

define([
    'text!modules/tab/templates/panel_container.html',
    ],
    function(panel_container){
        App.TabModule.PanelContainerView  = Backbone.Marionette.CompositeView.extend({
            tagName: 'div',
            initialize: function(){
                //this.$el.prop('id', this.model.get('id'));
                //this.$el.prop('class', this.model.get('class')+ ' tab-pane');
            },
            events: {

            },
            attributes : function () {
                return {
                    'role': 'tabpanel'
                };
            },
            template: function() {
                return _.template(panel_container)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.TabModule.PanelContainer.onRender event called.', 0);
                //var _options = this.model.get('options');

                App.TabModule.vent.trigger('App.TabModule.PanelContainerView.render', this);
            },
            childView: App.TabModule.PanelItemView
            
        });
    }
);