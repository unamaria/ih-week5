$('form').on('submit', function (event) {
	event.preventDefault();

	var searchTerm = $('#song').val();
	var url = "https://api.spotify.com/v1/search?type=track&query=" + searchTerm;

	$.get(url, handleResponse);

	function handleResponse (response) {

		var item = response.tracks.items[0];
		var song_title = item.name;
		var artist_name = item.artists[0].name;
		var image_url = item.album.images[0].url;
		var preview_url = item.preview_url;

		$('.title').text(song_title);
		$('.author').text(artist_name);
		$('.cover img').prop("src", image_url);
		$('audio').prop("src", preview_url);
	}

})


$('.btn-play').on('click', function () {
	
	if ($(this).hasClass("disabled")) {
		$(this).removeClass("disabled");
		$(this).addClass("playing");
		$('.js-player').trigger('play');
	} else if ($(this).hasClass("playing")) {
		$(this).removeClass("playing");
		$(this).addClass("disabled");
		$('.js-player').trigger('pause');
	};
})

// Define a function to print the player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
  $('progress').prop("value", current);
}

// Have printTime be called when the time is updated
$('.js-player').on('timeupdate', printTime);
