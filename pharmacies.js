angular.module('list_pharmacies', [])
.controller('PharmaciesController', function($scope, $http) {
    $http.get('http://192.168.0.13:8080/backend/back-office/pharmacy').
        then(function(response) {
            $scope.pharmacies = response.data;
        });
});
