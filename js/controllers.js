'use strict';
angular.module('watchdog')
    .
    controller('DeviceController',['$scope','appFactory' , function($scope,appFactory) {
        $scope.appliances= appFactory.getAppliances();
        console.log($scope.appliance)
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