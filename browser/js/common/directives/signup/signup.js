app.directive('signup', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/common/directives/signup/signup.html',
			controller: function($scope, UserFactory, $state){
				$scope.signup = {};
				$scope.error = null;
				$scope.sendsignup = function (signupInfo) {
						$scope.error = null;
						UserFactory.signup(signupInfo).then(function (user) {
								$state.go('user', { id: user._id });
						}).catch(function () {
								$scope.error = 'Invalid signup credentials.';
						});
				};
			}
		}
});
