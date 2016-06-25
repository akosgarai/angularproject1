angular.module('authoritysearch', []).controller('authoritysearchController', ['$scope', function ($scope) {
    $scope.providers = [];
    $scope.activities = [];

    $scope.selectedProviderId = '';
    $scope.selectedActivities = [];

    $scope.init = function () {
        $scope.providers = [
            {
                'label' : 'Provider1 label',
                'id' : 1
            },
            {
                'label' : 'Provider2 label',
                'id' : 2
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
                'parentProviderIds' : [2]
            },
            {
                'label' : 'hidden activity label',
                'id' : 3,
                'parentProviderIds' : [1]
            }
        ];
        $scope.selectedProviderId = '';
        $scope.selectedActivities = [];
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
            $scope.selectedActivities = [];
            $scope.selectedProviderId = '';
        }
    };

    $scope.needToShowActivity = function (activity) {
        var ids = activity['parentProviderIds'];
        if (ids.indexOf($scope.selectedProviderId) > -1) {
            return true;
        }
        if (activity['parentProviderIds'].length == 0) {
            return true;
        }
        return false;
    };

    $scope.activityClickHandler = function (activityId) {
        var selActs = $scope.selectedActivities;
        if (selActs.indexOf(activityId) > -1) {
            $scope.selectedActivities.splice(selActs.indexOf(activityId), 1);
        } else {
            $scope.selectedActivities.push(activityId);
        }
    };
}]).controller('authorityNavbarController', ['$scope', function ($scope) {
    $scope.app = 'search';

    $scope.setApp = function (appName) {
        $scope.app = appName;
    };
}]);
