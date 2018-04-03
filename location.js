$(function(){

	function getLocation(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(success);
		}	
		else {
			console.log("err");
		}


	function success(position){
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;
		var apiUrl = "https://fcc-weather-api.glitch.me/api/current?lon="+longitude+"&lat="+latitude; 	

		$.getJSON(apiUrl, function(response){
			var weather = "<p>"+response.weather[0].main+"</p>";
			var image = '<img src='+response.weather[0].icon+'alt="weatherImage">';
			var justTemp = response.main.temp;
			var temp = "<p>"+response.main.temp+'<span id="celsius">&#8451</span>'+"</p>";
			var location = "<p>"+response.name+", "+response.sys.country+"</p>";
			

			$("#weatherLoc").html(location);
			$("#weatherImage").html(image);
			$("#weatherTemp").html(temp)
			$("#weatherCond").html(weather);

			$("#weatherTemp").on("click", "#celsius",  function(){
				var conFahrenheit = "<p>"+fahrenheit(justTemp)+'<span id="fahrenheit">&#8457</span>'+"</p>";
				$("#weatherTemp").html(conFahrenheit)
				
			})

			$("#weatherTemp").on("click", "#fahrenheit",  function(){
				var conCelsius = "<p>"+celsius(fahrenheit(justTemp))+'<span id="celsius">&#8451</span>'+"</p>";
				$("#weatherTemp").html(conCelsius)
				
			})

		})
	}

	}


getLocation();

})

function fahrenheit(temp){
	var fah= Math.round(((temp*9)/5)+32);
	return fah;
}

function  celsius(temp){
	var cel = Math.round(((temp-32)*5)/9);
	return cel;
}



