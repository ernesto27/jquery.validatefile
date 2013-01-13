(function($){

	$.fn.validateFile = function(options){

	var defaults = {
		support: "jpg jpeg gif png",
		size: "200kb",
		errorFileType: null,
		errorFileSize: null,
	}


	settings = $.extend({}, defaults, options);

	var arrSupport = settings.support.split(" "),
		self = $(this),
		size = settings.size.match(/\d+/);


	var showMessage = function(typeError, supportHint, type){
		if(type === "size"){
			defaultError = "This file must be less than " + supportHint +"</span>" 
		}else {
			defaultError = "This file must be " + supportHint +" type</span>" 
		}
	
		var elem = "<span id='error-file-type' style='color:red'>";
	
		elem += typeError 
					? typeError + "</span>" 
					: defaultError
						
		$(elem).insertAfter(self);
		buttonSubmit.attr("disabled","disabled");
	}
	

	if(window.File){
		self.change(function(){
			$("#error-file-type").remove();

			var $this = this.files[0];
			 	buttonSubmit = self.siblings("input[type=submit]").first(),
			 	accept = false,
			 	fileType = $this.type,
			 	fileSize = $this.size;



			for( i=0, len = arrSupport.length; i < len; i++){
				if(fileType.match(arrSupport[i])){
					console.log("the file match");
					accept = true;
					buttonSubmit.removeAttr("disabled");
					break;
				}
			}

			if(!accept){
				showMessage(settings.errorFileType, settings.support,"type");
				return;
		
			}
			
			// validate size file
	
			if(fileSize > size[0] * 1024  ){ 
				showMessage(settings.errorFileSize, settings.size,"size");
				return;
			}		

			if(accept){
				$("#error").remove();
			}

		})
		

	}else{
		alert("your browser does not support file api")
	}

	}

})(jQuery)