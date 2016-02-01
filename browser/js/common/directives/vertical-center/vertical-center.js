app.directive('verticalCenter', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var grandparentHeight = $(element).parent().parent().css("height");
			$(element).css("height", grandparentHeight);
			console.log("grandparentHeight", grandparentHeight);
			console.log("element", $(element).css("position", "relative"));
			console.log("parent height", $(element).parent().css("height"));
			console.log("grandparent height", $(element).parent().parent().css("height"));
		}
	}
})