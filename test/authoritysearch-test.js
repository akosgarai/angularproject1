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
});
