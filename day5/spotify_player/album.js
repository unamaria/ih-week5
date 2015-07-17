var Album = function () {
	this.url = "https://api.spotify.com/v1/search?type=artist&query=";
}

Album.prototype.fetch = function () {
	var artist = $('.author').text();
	var url = this.url + artist;

	$.get(url, this.render);
}

Album.prototype.render = function (response) {
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

module.exports = Album;
