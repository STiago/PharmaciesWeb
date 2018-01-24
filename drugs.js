angular.module('list_drugs', [])
.controller('DrugsController', function($scope, $http) {
    $http.get('http://192.168.0.13:8080/backend/back-office/drug').
        then(function(response) {
            $scope.drugs = response.data;
        });
});


