app.directive('verticalCenter', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var grandparentHeight = $(element).parent().parent().css("height");
			$(element).css("height", grandparentHeight);
		}
	}
})