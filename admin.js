var app = angular.module('list_pharmacies', [ "ngResource" ]);
 
app.controller('PharmaciesController', [ '$scope', '$http',
                                     
	function($scope, $http) {
		$scope.getPharmacies = function() {
			 $http.get('http://192.168.0.13:8080/backend/back-office/pharmacy').
                then(function(response) {
                $scope.pharmacies = response.data;
            });
		}
		
		$scope.addPharmacy = function() {
			$http.post('http://192.168.0.13:8080/backend/back-office/pharmacy', 
				{
					name : $scope.name,
                    address : $scope.address,
					province : $scope.province,
                    city : $scope.city,
                    postalCode : $scope.postalCode,
                    latitude : $scope.latitude,
                    longitude : $scope.longitude
				}
			).success(function(data) {
				$scope.msg = 'Added!';
                window.alert($scope.name);
				$scope.getPharmacies();
			}).error(function(data) {
				$scope.msg = 'Error';
                window.alert("Error.");
			});
		}

        $scope.putPharmacy = function() {
			$http.put('http://192.168.0.13:8080/backend/back-office/pharmacy', 
				{
					name : $scope.name,
                    address : $scope.address,
					province : $scope.province,
                    city : $scope.city,
                    postalCode : $scope.postalCode,
                    latitude : $scope.latitude,
                    longitude : $scope.longitude
				}
			).success(function(data) {
				$scope.msg = 'Updated!';
				$scope.getPharmacies();
			}).error(function(data) {
				$scope.msg = 'Error';
			});
		}
} ]);
