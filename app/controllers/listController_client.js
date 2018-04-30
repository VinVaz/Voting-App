'use strict';

(function(){
	var dropDownList = document.getElementById("drop-down-list");
	var apiUrl = appUrl + '/profile/:poll/api/clicks';
	
	function createNewOptionElement(name){
		var option = document.createElement('OPTION');
		option.innerHTML = name;
		option.setAttribute('VALUE', name);
		dropDownList.appendChild(option);
	}
	
	function updateDropDownList(data){
	  var pollObject = JSON.parse(data);
	  dropDownList.setAttribute('NAME', pollObject.poll.name);
	  var numOfOptions = pollObject.poll.options.length;
	  for(var i = 0; i < numOfOptions; i++){
		var name = pollObject.poll.options[i].name;
		createNewOptionElement(name);
	  }
	}
	
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateDropDownList));
})();