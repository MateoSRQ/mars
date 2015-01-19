'use strict';

define([
    'text!modules/tab/templates/header_item.html',
    ],
    function(header_item){
        App.TabModule.HeaderItemView  = Backbone.Marionette.ItemView.extend({
            tagName: 'li',
            initialize: function(){
                //this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', this.model.get('tab_class'));
            },
            events: {
                'click': 'header_item_click'
            },
            attributes : function () {
                return {
                    'rel': this.model.get('id')
                };
            },
            template: function(model) {
                var id = model.id;
                var name = model.name;
                return _.template(header_item)({
                    id: id,
                    name: name
                })
            },
            onRender: function(){
                App.execute('debug', 'App.TabModule.HeaderItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                App.TabModule.vent.trigger('HeaderItemView.render', this);
            },
            
            header_item_click: function(e) {
                App.execute('debug', 'App.TabModule.HeaderItemView.header_item_click event called.', 0);
                //console.log(e);
                App.TabModule.vent.trigger('App.TabModule.HeaderItemView.header_item_click', this);
            }
            
            
        });
    }
);