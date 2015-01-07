'use strict';
define([
    'text!modules/stack/templates/container.html',
    ],
    function(container){
        
        App.TabModule.ContainerView  = Backbone.Marionette.CompositeView.extend({
            tagName: 'ul',
            initialize: function(){
                this.$el.prop('id', this.options.id);
                this.$el.prop('class', this.options.class + '');
                //this.$el.attr('role', 'tabpanel');
                
            },
            template: function() {
                return _.template(collection)({
                })
            },

            attributes : function () {
                return {
                    role: 'stacklist'
                };
            },

            childView: App.StackModule.ItemView
        });


    
    }
);