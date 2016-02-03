app.controller('NavController', function($scope, PresentationModeFactory){

	$scope.mode = function(){
		return PresentationModeFactory.getMode();
	};

});