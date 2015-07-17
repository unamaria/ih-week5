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
		$('.author a').text(artist_name);
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

function updateProgressBar () {
  var current = $('.js-player').prop('currentTime');
  $('progress').prop("value", current);
}

$('.js-player').on('timeupdate', updateProgressBar);

$('.author a').on('click', function () {
	var artist = $('.author').text();
	var url = "https://api.spotify.com/v1/search?type=artist&query=" + artist;

	$.get(url, handleResponse);

	function handleResponse (response) {

		var item = response.artists.items[0];
		var artist_name = item.name;
		var genres = item.genres;
		var image_url = item.images[2].url;

		if (genres) {
			var html_genres = "<p>";
			for (var i = 0; i < genres.length; i++) {
				html_genres = html_genres + genres[i] + " ";
			};
			html_genres = html_genres + "</p>"
		}

		var html = `<h2>${artist_name}</h2>` +
								`<p>${html_genres}</p>` +
								`<img src="${image_url}">`;

		$('.artist').append(html);
	}
})
