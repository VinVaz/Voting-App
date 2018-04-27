'use strict';

(function(){
	var boxSpace = document.getElementById("poll-boxes-space");
	var dropDownList = document.getElementById("drop-down-list");
	var apiUrl = appUrl + '/api/clicks';
	
	function createNewPollBox(){
		var link = document.createElement('A');
		//change this attribute later so that it can serve a specific user:
		link.setAttribute("href", "/profile");
		
		var button = document.createElement('BUTTON');
		button.setAttribute("class", "poll-box-button");
        
		link.appendChild(button);
		boxSpace.appendChild(link);
	}
	function updatePollBox(data){
		var pollObject = JSON.parse(data);
		var poll = pollObject.name;
		createNewPollBox();
		//change this query selector so that it can perform 
		//changes for all of the buttons that will be created:
		var pollButton = document.querySelector(".poll-box-button");
		pollButton.innerHTML = poll;
	}
	function createNewOptionElement(name){
		var option = document.createElement('OPTION');
		option.innerHTML = name;
		dropDownList.appendChild(option);
	}
	function updateDropDownList(data){
	  var pollObject = JSON.parse(data);
	  var arrOfOptions = Object.keys(pollObject.option);
	  var numOfOptions = arrOfOptions.length;
	  for(var i = 0; i < numOfOptions; i++){
		  var name = arrOfOptions[i]
		  createNewOptionElement(name);
	  }
	}
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateDropDownList));
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updatePollBox));
})();
