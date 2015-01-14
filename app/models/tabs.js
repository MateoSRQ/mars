'use strict'
App.TabItem = Backbone.Model.extend({
});

App.TabCollection = Backbone.Collection.extend({
    model: App.TabItem
});

App.Tabs = new App.TabCollection([
    { id: 'tab_1', name: 'Mapa de información', panel_class: 'tab_panel active', tab_class: 'tab_item active', options: {  } },
    { id: 'tab_2', name: 'Mapa de datos',       panel_class: 'tab_panel',        tab_class: 'tab_item',        options: {  } }
]);
