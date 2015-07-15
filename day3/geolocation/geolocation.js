$('.js-map').on('click', function(event) {

	event.preventDefault();
	if("geolocation" in navigator) {

		var onLocation = function(position) {

			var latitude  = position.coords.latitude;
    	var longitude = position.coords.longitude;
			var url = "https://maps.googleapis.com/maps/api/staticmap?markers=" + latitude + ',' + longitude + '&zoom=13&size=600x300';

			var handleSuccess = function() {
				$('.js-map').after('<img src="' + url + '">');
			};

			$.get(url, handleSuccess);

		};

		var onError = function() {
			console.log('errrrror');
		};

		var options;

		navigator.geolocation.getCurrentPosition(onLocation, onError, options);


	} else {
		console.log('no navigator');
	}
})
