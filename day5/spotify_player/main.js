var Spotify = function () {
	this.trackUrl = "https://api.spotify.com/v1/search?type=track&query="
	this.albumUrl = "https://api.spotify.com/v1/search?type=artist&query="
	this.$playButton = $('.btn-play')
	this.setInitialListeners()
}

Spotify.prototype.setInitialListeners = function () {
	var spotify = this;
	$('form').on('submit', function (event) {
		event.preventDefault();

		var searchTerm = $('#song').val();
		var url = "https://api.spotify.com/v1/search?type=track&query=" + searchTerm;
		$.get(url, spotify.renderTrack);
	})
	this.$playButton.on('click', function () { spotify.playPause() });
	$('.js-player').on('timeupdate', function () { spotify.updateProgressBar() });
	$('.author a').on('click', function () { spotify.fetchAlbum(); });
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
	if (this.$playButton.hasClass("disabled")) {
		this.$playButton.removeClass("disabled");
		this.$playButton.addClass("playing");
		$('.js-player').trigger('play');
	} else if (this.$playButton.hasClass("playing")) {
		this.$playButton.removeClass("playing");
		this.$playButton.addClass("disabled");
		$('.js-player').trigger('pause');
	};
}

Spotify.prototype.updateProgressBar = function () {
  var current = $('.js-player').prop('currentTime');
  $('progress').prop("value", current);
}

Spotify.prototype.fetchAlbum = function () {
	var artist = $('.author').text();
	var url = "https://api.spotify.com/v1/search?type=artist&query=" + artist;
	$.get(url, this.renderAlbum);
}

Spotify.prototype.renderAlbum = function (response) {
	var item = response.artists.items[0];
	var artist_name = item.name;
	var genres = item.genres;
	var image_url = item.images[2].url;

	if (genres) {
		var html_genres = "";
		for (var i = 0; i < genres.length; i++) {
			html_genres = html_genres + '<span class="label label-default">' + genres[i] + "</span>";
		};
	}

	var html = `<p>${html_genres}</p>` +
						 `<img src="${image_url}">`;

	$('.modal-header h2').text(artist_name);
	$('.modal-body').html(html);

	$('.modal').modal();
}



spotify = new Spotify();

