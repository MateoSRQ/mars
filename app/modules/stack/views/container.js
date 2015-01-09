'use strict';
define([
    'text!modules/stack/templates/container.html',
    ],
    function(container){
        
        App.StackModule.ContainerView  = Backbone.Marionette.CompositeView.extend({
            tagName: 'div',
            events: {
                'click': 'test'
            },
            
            initialize: function(){
                this.$el.prop('id', this.options.id);
                this.$el.prop('class', this.options.class + '');
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
            
            test: function(e) {
                console.log(this.$el);
                if (this.$el.hasClass('active')) {
                    this.$el.velocity({
                        width: 80,
                        height: 80,
                        bottom: -40,
                        borderRadius: [ 80, "easeInSine"  ],
                        backgroundColor: '#fff',
                        opacity: 1,
                    }, {easing: [ 600, 35 ], duration: 400 });
                    this.$el.removeClass('active');
                }
                else {
                    this.$el.velocity({
                        /*
                        width: 80,
                        height: 80,
                        bottom: -40,
                        borderRadius: [ 80, "easeInSine"  ]
                        */
                        width: '100%',
                        height: '100%',
                        bottom: 0,
                        borderRadius: 0,
                        backgroundColor: '#222',
                        opacity: 0.6,
                    }, {easing: [ 600, 35 ], duration: 1000 });
                    this.$el.addClass('active');
                }
                

            },

            childView: App.StackModule.ItemView
        });


    
    }
);