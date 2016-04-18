'use strict';
angular.module('watchdog')
    .
    controller('DeviceController',['$scope','appFactory' , function($scope,appFactory) {
        $scope.appliances= [];
        appFactory.getAppliances()
            .then(
            function(response) {
                $scope.appliances = response.data;
            }
        );
        console.log($scope.appliances);

        $scope.add=function(appliance){
           var app=angular.copy(appliance);
            app.checked=false;
            console.log("Adding appliance!"+JSON.stringify(app));
            appFactory.addAppliance(app);
        }

        // remove an appliance
        $scope.remove = function() {
            console.log("Remove function called")
            $scope.appliances.forEach(function(appliance) {

                if(appliance.checked){
                    console.log("Removing "+appliance.device_id)
                    appFactory.deleteAppliance(appliance.device_id)
                }

            });
        };

    }])
    .
    controller('HomePageController',['$scope','appFactory' , function($scope,appFactory) {
        $scope.applianceHistory= appFactory.getUsageHistory();
        console.log($scope.appliance)
    }])
    .
    controller('HealthController',['$scope','appFactory' , function($scope,appFactory) {
        $scope.appliances= appFactory.getAppliances();
        console.log($scope.appliance)
    }])
    .
    controller('DashboardController',['$scope','appFactory' , function($scope,appFactory) {
        $scope.appliances= appFactory.getAppliances();
        console.log($scope.appliance)
    }])

;