'use strict';
angular.module('watchdog')
    .factory('appFactory', [function() {
        var appfac={};
        var appliances=
             [
                    {
                        "device_id": 1,
                        "device_name": "My iphone",
                        "status": "active",
                        "channel_name": "ch1",
                        "alt": "iphone",
                        "image": "glyph stroked app-window"
                    },
                 {
                     "device_id": 1,
                     "device_name": "My iphone",
                     "status": "active",
                     "channel_name": "ch1",
                     "alt": "iphone",
                     "image": "glyph stroked app-window"
                 },
                 {
                     "device_id": 1,
                     "device_name": "My iphone",
                     "status": "active",
                     "channel_name": "ch1",
                     "alt": "iphone",
                     "image": "glyph stroked app-window"
                 }
                ]
            ;

        var appliance_usage=[
            {
                "device_id": 1,
                "device_name": "My iphone",
                "last_usage" : 6
            },
            {
                "device_id": 2,
                "device_name": "Refrigerator",
                "last_usage" : 230
            },
            {
                "device_id": 3,
                "device_name": "Television",
                "last_usage" : 9
            }
        ];

        appfac.getUsageHistory=function(){
            return appliance_usage;
        };

        appfac.getAppliances=function(){
            return appliances;
        };
        return appfac;
    }]);


