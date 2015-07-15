var locations = [];
var list_locations;

// SAVE LOCATION
$('#js-locations-register').on('click', function(event) {
	event.preventDefault();

	if("geolocation" in navigator) {

		var onLocation = function(position) {

			var latitude  = position.coords.latitude;
    	var longitude = position.coords.longitude;

    	var currentLocation = {
    		location: latitude + ',' + longitude,
    		timestamp: new Date().getTime()
    	}

			locations.push(currentLocation);
			window.localStorage.setItem("locations", JSON.stringify(locations));
			
		};

		var onError = function() {
			console.log('Couldn\'t get current location');
		};

		navigator.geolocation.getCurrentPosition(onLocation, onError);

	} else {
		console.log('no navigator');
	}

})

// LIST LOCATIONS
$('#js-locations-list').on('click', function (event) {
	event.preventDefault();
	
	list_locations = function() { 
		$('.locations-list').empty();

		var local_locations = JSON.parse(localStorage.getItem("locations"));
		var html = "";

		if(local_locations) {
			local_locations.forEach( function (location) {
				html += ('<li>'+
					'<p>Location: ' + location.location + '</p>' +
					'<p>Date: ' + new Date(location.timestamp) + '</p>' +
					'</li>');
			})
		} else {
			html = 'Nowhere!';
		}
		$('.locations-list').html(html);
	}

	list_locations();

})

// DELETE LOCATIONS
$('#js-locations-remove').on('click', function(event){
	event.preventDefault();

	localStorage.removeItem("locations");
	alert("Tracks cleared!");
	list_locations();

})
