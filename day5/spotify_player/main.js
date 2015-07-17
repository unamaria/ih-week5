$('form').on('submit', function (event) {
	event.preventDefault();

	var searchTerm = $('#song').val();
	var url = "https://api.spotify.com/v1/search?type=track&query=" + searchTerm;

	$.get(url, handleResponse);

	function handleResponse (response) {
		console.log(response)
		var song_title = response.tracks.items[0].name;
		var artist_name = response.tracks.items[0].artists[0].name;
		var image_url = response.tracks.items[0].album.images[0].url;

		$('.title').text(song_title);
		$('.author').text(artist_name);
		$('.cover img').prop("src", image_url);
	}

})