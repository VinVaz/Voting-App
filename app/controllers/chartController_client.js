'use strict';

(function(){
	var apiUrl = appUrl + '/profile/:poll/api/clicks';
	
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateChart));
	
	function updateChart(data){
	  var clicksObject = JSON.parse(data);
	  var pollName = clicksObject.poll.name;
	  var myOptions = clicksObject.poll.options;
	  var chartDataArray = [["option", "votes"]];
	  for(var i = 0; i < myOptions.length; i++){
		var info = [myOptions[i].name, myOptions[i].clicks];
        chartDataArray[i+1] = info;
	  }
	  createGoogleChart(pollName, chartDataArray);
	}
	
	function createGoogleChart(name, contentArr){
	  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(contentArr);
        var options = {
          title: name,
		  backgroundColor: '#dedede'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);  
	  }
	}

})();
