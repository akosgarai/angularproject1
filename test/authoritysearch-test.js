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
                    'parentProviderIds' : []
                },
                {
                    'label' : 'hidden activity label',
                    'id' : 3,
                    'parentProviderIds' : []
                }
            ];
            var expectedSelectedProviderId = '';
            $scope.init();
            expect([$scope.providers, $scope.activities, $scope.selectedProviderId]).toEqual([expectedProviders, expectedActivities, expectedSelectedProviderId]);
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
                'parentProviderIds' : []
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
});
