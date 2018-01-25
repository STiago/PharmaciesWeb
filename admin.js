var app = angular.module('list_pharmacies', [ "ngResource", "ngDialog" ]);

app.controller('MainCtrl', function ($scope, ngDialog) {
    $scope.open = function () {
      ngDialog.open({
    template: '<p>my template</p>',
    plain: true
});
    };
});

app.controller('PharmaciesController', function($scope, $http, ngDialog) {
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

    $scope.pharmacy = {};

    $scope.editPharmacy = function(selectedPharmacy){
        $scope.pharmacy.id = selectedPharmacy.id;
        $scope.pharmacy.name = selectedPharmacy.name;
        $scope.pharmacy.address = selectedPharmacy.address;
        $scope.pharmacy.province = selectedPharmacy.province;
        $scope.pharmacy.city = selectedPharmacy.city;
        $scope.pharmacy.postalCode = selectedPharmacy.postalCode;
        $scope.pharmacy.latitude = selectedPharmacy.latitude;
        $scope.pharmacy.longitude = selectedPharmacy.longitude;

        ngDialog.open({ template: 'pharmacy-popup', scope: $scope});
    }

    $scope.save = function(pharmacy){
          console.log(pharmacy);

          $http.put('http://192.168.0.13:8080/backend/back-office/pharmacy/'  + pharmacy.id,
    				{
    					name : pharmacy.name,
              address : pharmacy.address,
    					province : pharmacy.province,
              city : pharmacy.city,
              postalCode : pharmacy.postalCode,
              latitude : pharmacy.latitude,
              longitude : pharmacy.longitude
    				}
    			).success(function(data) {
    				$scope.msg = 'Updated!';
    				$scope.getPharmacies();
    			}).error(function(data) {
    				$scope.msg = 'Error';
    			});

            ngDialog.close('ngdialog2');
    }


});
