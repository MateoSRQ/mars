'use strict';
define([
    'text!modules/tab/templates/container.html',
    ],
    function(container){
        
        App.TabModule.ContainerView  = Backbone.Marionette.LayoutView.extend({
            views: {},
            initialize: function(){
                this.$el.prop('id', this.options.id);
                this.$el.prop('class', this.options.class );
            },
            template: function() {
                return _.template(container)({
                })
            },
            regions: {
                header_container: "#header_container",
                panel_container: "#panel_container"
            },
            onRender: function(){
                App.execute('debug', 'App.TabModule.ContainerView.onRender event called.', 0);
                this.views.panels  = new App.TabModule.PanelContainerView({collection: App.TabModule.collection});
                this.views.headers = new App.TabModule.HeaderContainerView({collection: App.TabModule.collection});
                this.getRegion('panel_container').show(this.views.panels);
                this.getRegion('header_container').show(this.views.headers);
                App.TabModule.vent.trigger('App.TabModule.ContainerView.render', this);
            }
        });
    }
);