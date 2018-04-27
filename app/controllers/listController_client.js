'use strict';

(function(){
	var dropDownList = document.getElementById("drop-down-list");
	var apiUrl = appUrl + '/api/clicks';
	
	function createNewOptionElement(name){
		var option = document.createElement('OPTION');
		option.innerHTML = name;
		dropDownList.appendChild(option);
	}
	function updateDropDownList(data){
	  var pollObject = JSON.parse(data);
	  var numOfOptions = pollObject.pull.options.length;
	  for(var i = 0; i < numOfOptions; i++){
		  var name = pollObject.pull.options[i].name;
		  createNewOptionElement(name);
	  }
	}
	
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateDropDownList));
})();
