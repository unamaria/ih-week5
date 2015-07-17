var Spotify = function () {
	this.trackUrl = "https://api.spotify.com/v1/search?type=track&query="
	this.albumUrl = "https://api.spotify.com/v1/search?type=artist&query="
	this.setInitialListener()
}

Spotify.prototype.setInitialListener = function () {
	var spotify = this;
	$('form').on('submit', function (event) {
		event.preventDefault();

		var searchTerm = $('#song').val();
		var url = "https://api.spotify.com/v1/search?type=track&query=" + searchTerm;
		$.get(url, spotify.renderTrack);
	})
}

Spotify.prototype.renderTrack = function (response) {
	var item = response.tracks.items[0];
	var song_title = item.name;
	var artist_name = item.artists[0].name;
	var image_url = item.album.images[0].url;
	var preview_url = item.preview_url;

	$('.title').text(song_title);
	$('.author a').text(artist_name);
	$('.cover img').prop("src", image_url);
	$('audio').prop("src", preview_url);
}


Spotify.prototype.playPause = function () {
		if ($(this).hasClass("disabled")) {
			$(this).removeClass("disabled");
			$(this).addClass("playing");
			$('.js-player').trigger('play');
		} else if ($(this).hasClass("playing")) {
			$(this).removeClass("playing");
			$(this).addClass("disabled");
			$('.js-player').trigger('pause');
		};
}

Spotify.prototype.updateProgressBar = function () {
  var current = $('.js-player').prop('currentTime');
  $('progress').prop("value", current);
}



spotify = new Spotify();
$('.btn-play').on('click', spotify.playPause);
$('.js-player').on('timeupdate', spotify.updateProgressBar);