'use strict';

(function(){
	var dropDownList = document.getElementById("drop-down-list");
	var submitButton = document.getElementById("submit-button");
	var newOptionInput = document.getElementById("new-option-input")
	var removePollBtn = document.getElementById("remove-button");
	var deletePollBtn = document.getElementById("remove-button");
	var apiUrl = appUrl + '/profile/:poll/api/clicks';


	function setLastOption(){
		var option = document.createElement('OPTION');
		option.innerHTML = "I want a custom option";
		option.setAttribute('VALUE', "last option");
		dropDownList.appendChild(option);
	}	
	
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
	  setLastOption();
	}
    ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateDropDownList));
	
	//hides the remove poll's button if the current poll its not some of the user's poll
	  var currentPollUrl = appUrl + '/current';
	  ajaxFunctions.ready(ajaxFunctions.newRequest('GET', currentPollUrl, function(data){
		var currentPoll = JSON.parse(data);
	    var mypollsUrl = appUrl + '/api/:user/polls';
		ajaxFunctions.newRequest('GET', mypollsUrl, function(data){
		  var myPollsArray = JSON.parse(data);
		  if(myPollsArray.includes(currentPoll)){
			  deletePollBtn.style.display = "block"
		  }
		  else{
			  deletePollBtn.style.display = "none"
		  }
	    });
	  }));
	
	window.onload = function(){
		var submitNewOption = document.getElementById("submit-new-option");
		var form = dropDownList.parentElement;
		
		dropDownList.onchange = function(){
			if(this.value=="last option"){
				form.setAttribute("ACTION", "/newoption/add");
				newOptionInput.style.display = "block";
				submitNewOption.setAttribute("NAME", "newoption");
				dropDownList.removeAttribute("NAME");
			}
			else{
				form.setAttribute("ACTION", "/profile/:poll/api/clicks/update");
				newOptionInput.style.display = "none";
				submitNewOption.removeAttribute("NAME");
				ajaxFunctions.newRequest('GET', apiUrl, function(data){
					var pollObject = JSON.parse(data);
	                dropDownList.setAttribute('NAME', pollObject.poll.name);
				});
			}
		}
	}
	
})();