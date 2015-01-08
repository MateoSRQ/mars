'use strict';
define([
    'text!modules/stack/templates/container.html',
    ],
    function(container){
        
        App.StackModule.ContainerView  = Backbone.Marionette.CompositeView.extend({
            tagName: 'div',
            initialize: function(){
                this.$el.prop('id', this.options.id);
                //this.$el.prop('class', this.options.class + '');
                //this.$el.attr('role', 'tabpanel');
                
            },
            template: function() {
                return _.template(container)({
                })
            },

            attributes : function () {
                return {
                    role: 'stacklist'
                };
            },
            
            onRender: function() {
                App.execute('debug', 'App.StackModule.ContainerView.onRender function called.', 0);
                App.StackModule.vent.trigger('App.StackModule.ContainerView.render', this);
            },

            childView: App.StackModule.ItemView
        });


    
    }
);