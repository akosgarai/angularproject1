angular.module('authoritysearch', []).controller('authoritysearchController', ['$scope', function ($scope) {
    $scope.providers = [];
    $scope.activities = [];

    $scope.selectedProviderId = '';

    $scope.init = function () {
        $scope.providers = [
            {
                'label' : 'Provider1 label',
                'id' : 1,
                'status' : 'default',
                'activityList' : [3]
            },
            {
                'label' : 'Provider2 label',
                'id' : 2,
                'status' : 'default',
                'activityList' : []
            }
        ];
        $scope.activities = [
            {
                'label' : 'activity label 1',
                'id' : 1,
                'hiddenFlag' : false,
                'displayCount' : 0,
                'childActivity' : []
            },
            {
                'label' : 'activity label 2',
                'id' : 2,
                'hiddenFlag' : false,
                'displayCount' : 0,
                'childActivity' : []
            },
            {
                'label' : 'hidden activity label',
                'id' : 3,
                'hiddenFlag' : true,
                'displayCount' : 0,
                'childActivity' : []
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
        $scope.selectedProviderId = providerId;
    };
}]);

