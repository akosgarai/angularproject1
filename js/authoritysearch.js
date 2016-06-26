angular.module('authoritysearch', []).controller('authoritysearchController', ['$scope', function ($scope) {
    $scope.selectedProviderId = '';
    $scope.selectedActivities = [];
    $scope.terminals = [];


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
        $scope.getTerminalIds();
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
        $scope.getTerminalIds();
    };
    $scope.getTerminalIds = function () {
        $scope.terminals = [];
        if ($scope.selectedProviderId == '' || typeof ($scope.authorityMap[$scope.selectedProviderId]) == 'undefined') {
            return;
        }
        var provider = $scope.authorityMap[$scope.selectedProviderId];
        var activities = $scope.selectedActivities;
        for (var i in activities) {
            if (typeof (provider[activities[i]]) != 'undefined' && provider[activities[i]]['type'] == 'terminal') {
                var insert = true;
                for (var j in $scope.terminals) {
                    if ($scope.terminals[j]['id'] == provider[activities[i]]['id']) {
                        insert = false;
                    }
                }
                if (insert) {
                    $scope.terminals.push($scope.getAuthorityById(provider[activities[i]]['id']));
                }
            }
        }
    };
    $scope.getAuthorityById = function (id) {
        for (var e in $scope.authorities) {
            if ($scope.authorities[e]['id'] == id) {
                return $scope.authorities[e];
            }
        }
        return {};
    };
}]).controller('authorityNavbarController', ['$scope', function ($scope) {
    $scope.app = 'search';

    $scope.setApp = function (appName) {
        $scope.app = appName;
    };
}]).controller('authorityInitializatorController', ['$scope', function ($scope) {
    $scope.authorityLoaded = false;
    $scope.providerLoaded = false;
    $scope.activityLoaded = false;
    $scope.authorityMapLoaded = false;

    $scope.providers = [];
    $scope.activities = [];
    $scope.authorities = [];
    $scope.authorityMap = {};

    $scope.initAppMock = function () {

        /*
         * google.script.run
         * .withSuccessHandler('name-of-success-handler-function')
         * .withErrorHandler('name-of-error-handler-function')
         * .serverSideFunctionName()
         * */
        $scope.providers = [
            {
                'label' : 'Provider1 label',
                'id' : 1
            },
            {
                'label' : 'Provider2 label',
                'id' : 2
            },
            {
                'label' : 'Provider3 label',
                'id' : 3
            },
            {
                'label' : 'Provider4 label',
                'id' : 4
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
            },
            {
                'label' : 'Activity label 3',
                'id' : 4,
                'parentProviderIds' : [3]
            }
        ];
        $scope.authorities = [
            {
                'id' : 1,
                'label' : 'Authority Label Nr1',
                'authorityAddress' : 'City, Street, house, building, floor, door, ...',
                'authorityPhone' : '+3610000000',
                'authorityEmail' : 'info@example.com',
                'authorityWeb' : 'http://www.example.com'
            },
            {
                'id' : 2,
                'label' : 'Authority Label Nr2',
                'authorityAddress' : 'City, Street, house, building, floor, door, ...',
                'authorityPhone' : '+3610000000',
                'authorityEmail' : 'info@example.com',
                'authorityWeb' : 'http://www.example.com'
            },
            {
                'id' : 3,
                'label' : 'Authority Label Nr3',
                'authorityAddress' : 'City, Street, house, building, floor, door, ...',
                'authorityPhone' : '+3610000000',
                'authorityEmail' : 'info@example.com',
                'authorityWeb' : 'http://www.example.com'
            },
            {
                'id' : 4,
                'label' : 'Authority Label Nr4',
                'authorityAddress' : 'City, Street, house, building, floor, door, ...',
                'authorityPhone' : '+3610000000',
                'authorityEmail' : 'info@example.com',
                'authorityWeb' : 'http://www.example.com'
            }
        ];
        $scope.authorityMap = {
            1 : {
                1 : {'type' : 'terminal', 'id' : 1},
                3 : {'type' : 'terminal', 'id' : 2}
            },
            2 : {
                1 : {'type' : 'terminal', 'id' : 1},
                2 : {'type' : 'terminal', 'id' : 2}
            },
            3 : {
                1 : {'type' : 'terminal', 'id' : 3},
                4 : {'type' : 'terminal', 'id' : 3}
            }
        };
    };

}]).controller('authorityListController', ['$scope', function ($scope) {
}]);
