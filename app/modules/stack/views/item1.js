App.StackModule.MyView = Backbone.Marionette.ItemView.extend({
    template: "#some-template",
    events: {
        'click #selector li a': 'select_option',
        'click #selector2 li a': 'select2_option'
    },
  
    select_option: function(e) {
        console.log('clocko');
        App.StackModule.vent.trigger('App.StackModule.MyView.select_option', e);
    },
    
    select2_option: function(e) {
        console.log('clocko2');
        App.StackModule.vent.trigger('App.StackModule.MyView.select2_option', e);
    }
});