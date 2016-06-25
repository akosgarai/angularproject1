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
    describe('TEST002 - init function test', function () {
        it('it checks the init function - mock the init request for providers and activities', function () {
            var $scope = {};
            var controller = $controller('authoritysearchController', { '$scope' : $scope});
            $scope.providers = [];
            $scope.activities = [];
            var expectedProviders = [
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
            var expectedActivities = [
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
            $scope.init();
            expect([$scope.providers, $scope.activities]).toEqual([expectedProviders, expectedActivities]);
        });
    });
});
