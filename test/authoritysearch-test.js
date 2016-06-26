describe('Example module Unit Tests', function () {
    beforeEach(module('authoritysearch'));

    var $controller;
    
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('TEST001 - sample test name', function () {
        it('it describes the sample test', function () {
            var $scope = {};
            var controller = $controller('authoritysearchController', { '$scope' : $scope});
            var expected = [{
            }];
            $scope.expected = expected;
            expect($scope.expected).toEqual(expected); 
        }); 
    });
    describe('TEST002 - $scope.init function test', function () {
        it('it checks the init function - mock the init request for providers and activities', function () {
            var $scope = {};
            var controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            var expectedProviders = [
                {
                    'label' : 'Provider1 label',
                    'id' : 1
                },
                {
                    'label' : 'Provider2 label',
                    'id' : 2
                }
            ];
            var expectedActivities = [
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
            var expectedSelectedProviderId = '';
            var expectedSelectedActivies = [];
            $scope.init();
            expect([$scope.providers, $scope.activities, $scope.selectedProviderId, $scope.selectedActivities]).toEqual([expectedProviders, expectedActivities, expectedSelectedProviderId, expectedSelectedActivies]);
        });
    });
    describe('TEST003 - $scope.getActivityById function tests', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            $scope.init();
        });
        it('try to find an existing id, so it should return activity object', function () {
            var expected = {
                'label' : 'hidden activity label',
                'id' : 3,
                'parentProviderIds' : [1]
            };
            var activity = $scope.getActivityById(3);
            expect(activity).toEqual(expected);
        });
        it('try to find an invalid id, so it should return empty object', function () {
            var expected = {};
            var activity = $scope.getActivityById(5);
            expect(activity).toEqual(expected);
        });
    });
    describe('TEST004 - $scope.getProviderById function tests', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            $scope.init();
        });
        it('try to find an existing id, so it should return provider object', function () {
            var expected = {
                    'label' : 'Provider2 label',
                    'id' : 2
            };
            var activity = $scope.getProviderById(2);
            expect(activity).toEqual(expected);
        });
        it('try to find an invalid id, so it should return empty object', function () {
            var expected = {};
            var activity = $scope.getProviderById(5);
            expect(activity).toEqual(expected);
        });
    });
    describe('TEST005 - $scope.providerClickHandler function tests', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            $scope.init();
        });
        it('It checks the selectedProviderId after Clicked Provider (id:2)', function () {
            var expected = 2;
            $scope.providerClickHandler(2);
            expect($scope.selectedProviderId).toEqual(expected);
        });
        it('It checks the selectedProviderId after Clicked Provider (id:2)', function () {
            var expected = 2;
            $scope.providerClickHandler($scope.getProviderById(2)['id']);
            expect($scope.selectedProviderId).toEqual(expected);
        });
        it('It checks the selectedProviderId after Clicked selected Provider twice (id:2)', function () {
            var expected = '';
            $scope.providerClickHandler(2);
            $scope.providerClickHandler(2);
            expect($scope.selectedProviderId).toEqual(expected);
        });
        it('It checks the selectedProviderId after Clicked selected Provider (id:2) and Provider (id:1) in this order', function () {
            var expected = 2;
            $scope.providerClickHandler(2);
            $scope.providerClickHandler(1);
            expect($scope.selectedProviderId).toEqual(expected);
        });
    });
    describe('TEST006 - $scope.needToShowActivity function tests', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            $scope.init();
        });
        it('Activity (id:1) should be shown, because of the empty parent list (provider (id:1) is selected)', function () {
            var expected = true;
            $scope.providerClickHandler(1);
            expect($scope.needToShowActivity($scope.activities[0])).toEqual(expected);
        });
        it('Activity (id:3) should be shown, because of the same parent list (1) (provider (id:1) is selected)', function () {
            var expected = true;
            $scope.providerClickHandler(1);
            expect($scope.needToShowActivity($scope.activities[0])).toEqual(expected);
        });
        it('Activity (id:2) should not be shown, because it has different (2) parent list (provider (id:1) is selected)', function () {
            var expected = false;
            $scope.providerClickHandler(1);
            expect($scope.needToShowActivity($scope.activities[1])).toEqual(expected);
        });
    });
    describe('TEST007 - $scope.activityClickHandler function tests', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            $scope.init();
        });
        it('Checking the selectedActivites array - first with empty array and clicking the activity (id:1)', function () {
            var expected = [1];
            $scope.activityClickHandler(1);
            expect($scope.selectedActivities).toEqual(expected);
        });
        it('Checking the selectedActivites array - next with [1] array and clicking the activity (id:2)', function () {
            var expected = [1,2];
            $scope.activityClickHandler(1);
            $scope.activityClickHandler(2);
            expect($scope.selectedActivities).toEqual(expected);
        });
        it('Checking the selectedActivites array - next with [1,2] array and clicking the activity (id:2)', function () {
            var expected = [1];
            $scope.activityClickHandler(1);
            $scope.activityClickHandler(2);
            $scope.activityClickHandler(2);
            expect($scope.selectedActivities).toEqual(expected);
        });
        it('Checking the selectedActivites array - next with [1,2] array and clicking the provider', function () {
            var expected = [];
            $scope.providerClickHandler(1);
            $scope.activityClickHandler(1);
            $scope.activityClickHandler(2);
            $scope.providerClickHandler(1);
            expect($scope.selectedActivities).toEqual(expected);
        });
    });
    describe('TESTNAVBAR -Navbar related test - navbar controller functions', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authorityNavbarController', { '$scope' : $scope});
        });
        it('Checking the app after start', function () {
            var expected = "search";
            expect($scope.app).toEqual(expected);
        });
        it('Checking the setApp function v1', function () {
            var expected = "list";
            $scope.setApp('list');
            expect($scope.app).toEqual(expected);
        });
        it('Checking the setApp function v2', function () {
            var expected = "search";
            $scope.setApp('list');
            $scope.setApp('search');
            expect($scope.app).toEqual(expected);
        });
    });
    describe('TESTAUTHORITYLIST -authority list related tests - list controller functions', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('authorityListController', { '$scope' : $scope});
        });
        it('Checking the app after start', function () {
            var expected = {};
            expect($scope.authorities).toEqual(expected);
        });
        it('Checking the init function', function () {
            var expected = [
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
                }
            ];
            $scope.init();
            expect($scope.authorities).toEqual(expected);
        });
    });
});
