angular.module('authoritysearch', []).controller('authoritysearchController', ['$scope', function ($scope) {
    $scope.providers = [];
    $scope.activities = [];

    $scope.selectedProviderId = '';

    $scope.init = function () {
        $scope.providers = [
            {
                'label' : 'Provider1 label',
                'id' : 1,
                'activityList' : [3]
            },
            {
                'label' : 'Provider2 label',
                'id' : 2,
                'activityList' : []
            }
        ];
        $scope.activities = [
            {
                'label' : 'activity label 1',
                'id' : 1,
                'parentProviderIds' : []
            },
            {
                'label' : 'activity label 2',
                'id' : 2,
                'parentProviderIds' : []
            },
            {
                'label' : 'hidden activity label',
                'id' : 3,
                'parentProviderIds' : []
            }
        ];
        $scope.selectedProviderId = '';
    };

    $scope.getProviderById = function (id) {
        for (var e in $scope.providers) {
            if ($scope.providers[e]['id'] == id) {
                return $scope.providers[e];
            }
        }
        return {};
    };

    $scope.getActivityById = function (id) {
        for (var e in $scope.activities) {
            if ($scope.activities[e]['id'] == id) {
                return $scope.activities[e];
            }
        }
        return {};
    };

    $scope.providerClickHandler = function (providerId) {
        if ($scope.selectedProviderId == '') {
            $scope.selectedProviderId = providerId;
        } else if ($scope.selectedProviderId == providerId){
            $scope.selectedProviderId = '';
        }
    };
}]);

