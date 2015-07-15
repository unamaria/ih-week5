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


$('.js-watch').on('click', function(event) {
// source: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
	event.preventDefault();

	var id, target;

	function success(position) {
		var coords = position.coords;

		if(target.latitude === crd.latitude && target.longitude === crd.longitude) {
	    console.log('Congratulations, you reached the target');
	    navigator.geolocation.clearWatch(id);
  	}
	}

	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	}

	target = {
	  latitude : 0,
	  longitude: 0
	};


	id = navigator.geolocation.watchPosition(success, error);

})
