app.factory('PresentationModeFactory', function(){

	var mode = "presentation";	//'browse' being the opposite of 'presentation' mode

	return {

		getMode: function(){
			return mode;
		},

		toggleMode: function(){
			if(mode === "browse"){
				mode = "presentation";
			} else {
				mode = "browse";
			}
		}
		
	};
});