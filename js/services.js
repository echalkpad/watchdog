'use strict';
angular.module('watchdog')
    .constant("baseURL","http://localhost:4000")
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

        appfac.addAppliance=function(app){
            return $http.post(baseURL+"/appliances/",app);
        }

        appfac.getUsageHistory=function(){
            return appliance_usage;
        };

        appfac.getAppliances=function(){
            console.log($http.get(baseURL+"/appliances"))
            return $http.get(baseURL+"/appliances")
        };

        appfac.deleteAppliance=function(id){
            console.log("service delete: "+id);
            $http.delete(baseURL+"/appliances/"+id);
        }
        return appfac;
    }]);


