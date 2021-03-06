'use strict';

define([
    'text!modules/stack/templates/item.html',
    ],
    function(item){
        App.StackModule.ItemView  = Backbone.Marionette.LayoutView.extend({
            regions: function(options){
              return {
                headerRegion: ".card_header",
                containerRegion: ".card_container"
              };
            },
            tagName: 'section',
            initialize: function(){
                this.$el.prop('id', this.model.get('id'));
                this.$el.prop('class', 'stack_item well' );

            },
            events: {

            },
            attributes : function () {
                return {
                };
            },
            template: function(model) {
                return _.template(item)({
                })
            },
            onRender: function(){
                App.execute('debug', 'App.StackModule.ItemView.onRender event called.', 0);
                var _options = this.model.get('options');
                //$('.card_container').perfectScrollbar({
                //    includePadding: true
                //});
                App.TabModule.vent.trigger('App.StackModule.ItemView.onRender', this);
            },
        });
    }
);