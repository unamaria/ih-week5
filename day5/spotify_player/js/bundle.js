(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Spotify = require('./spotify.js')
var Album = require('./album.js')

album = new Album();
spotify = new Spotify(album);
},{"./album.js":1,"./spotify.js":3}],3:[function(require,module,exports){
var Spotify = function (album) {
	this.album = album;
	this.trackUrl = "https://api.spotify.com/v1/search?type=track&query="
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
	$('.author a').on('click', function () { spotify.album.fetch() });
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

module.exports = Spotify;

},{}]},{},[2]);
