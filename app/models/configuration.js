'use strict';

App.ConfigurationItem = Backbone.AssociatedModel.extend({
    relations: [
        {
            type: Backbone.One, //nature of the relationship
            key: 'map', // attribute of Employee
            relatedModel: 'App.MapItem' //AssociatedModel for attribute key
        }
    ],
});

App.ConfigurationCollection = Backbone.Collection.extend({
    model: App.ConfigurationItem
});

App.MapItem = Backbone.Model.extend({
});

App.Map1 = new App.MapItem({
    id: 'map_1',
    map_id: 'map_1',
    class:  'map_item',

    region: 'tab_1',
    panel_id: 'panel_1',
    panel_class: 'panel_stack coverflow',
    panel_target: 'stack_1',
    center: [-75,-10.50],
    zoom: 5    
})

App.Map2 = new App.MapItem({
    id: 'map_2',
    map_id: 'map_2',
    class:  'map_item',

    region: 'tab_2',
    panel_id: 'panel_2',
    panel_class: 'panel_stack coverflow',
    panel_target: 'stack_2',
    center: [-75,-10.50],
    zoom: 5    
})

App.Map3 = new App.MapItem({
    id: 'map_3',
    map_id: 'map_3',
    class:  'map_item',

    region: 'tab_3',
    panel_id: 'panel_3',
    panel_class: 'panel_stack coverflow',
    panel_target: 'stack_3',
    center: [-75,-10.50],
    zoom: 5    
})



/*
 *
 *App.MapCollection = Backbone.Collection.extend({
    model: App.MapItem
});
App.MapsConfiguration = new App.MapCollection();

App.MapsConfiguration.add([

    {
        id: 'map_2',
        map_id: 'map_2',
        class:  'map_item',

        region: 'tab_2',
        panel_id: 'panel_2',
        panel_class: 'panel_stack coverflow',
        panel_target: 'stack_2',
        center: [-75,-10.50],
        zoom: 5

    }    
]);

*/

App.Configuration = new App.ConfigurationCollection();
App.Configuration.add([
    {
        id: 'tab_1',
        name: 'Mapa departamental',
        panel_class: 'tab_panel active',
        tab_class: 'tab_item active',
        map: App.Map1
    },
    {
        id: 'tab_2',
        name: 'Mapa provincial',
        panel_class: 'tab_panel',
        tab_class: 'tab_item',     
        map: App.Map2
    },
    {
        id: 'tab_3',
        name: 'Mapa distrital',
        panel_class: 'tab_panel',
        tab_class: 'tab_item',     
        map: App.Map3    },
    
   // panel_target: 'stack_1', center: [-75,-10.50], zoom: 5 
    /*    
   ,
   { id: 'tab_2', name: 'Mapa provincial',    panel_class: 'tab_panel',        tab_class: 'tab_item',        options: {} },
   { id: 'tab_3', name: 'Mapa distrital',     panel_class: 'tab_panel',        tab_class: 'tab_item',        options: {} }
    */
]);


/* should fetch from db */


