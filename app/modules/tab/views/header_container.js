'use strict';
define([
    'text!modules/tab/templates/header_container.html',
    ],
    function(header_container){
        
        App.TabModule.HeaderContainerView  = Backbone.Marionette.CompositeView.extend({
            tagName: 'ul',
            initialize: function(){
                this.$el.prop('id', this.options.id);
                this.$el.prop('class', this.options.class + ' nav nav-pills');
                //this.$el.attr('role', 'tabpanel');
                
            },
            template: function() {
                return _.template(header_container)({
                })
            },

            attributes : function () {
                return {
                    role: 'tablist'
                };
            },

            childView: App.TabModule.HeaderItemView
        });


    
    }
);