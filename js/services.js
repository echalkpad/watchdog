'use strict';
angular.module('watchdog')
    .constant("baseURL","https://demo5924853.mockable.io")
    .factory('appFactory',['$http','baseURL',function($http,baseURL) {
        var appfac={};
        /*var appliances=
             [
                    {
                        "device_id": 1,
                        "device_name": "My iphone",
                        "status": "active",
                        "channel_name": "ch1",
                        "alt": "iphone",
                        "image": "glyph stroked app-window",
                        "checked": false

                    },
                 {
                     "device_id": 2,
                     "device_name": "My iphone",
                     "status": "active",
                     "channel_name": "ch1",
                     "alt": "iphone",
                     "image": "glyph stroked app-window",
                     "checked": false

                 },
                 {
                     "device_id": 3,
                     "device_name": "My iphone",
                     "status": "active",
                     "channel_name": "ch1",
                     "alt": "iphone",
                     "image": "glyph stroked app-window",
                     "checked": false
                 }
                ]
            ;
*/
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
            console.log($http.get(baseURL+"/appliances"))
            return $http.get(baseURL+"/appliances")
        };
        return appfac;
    }]);


