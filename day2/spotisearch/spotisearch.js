
var getArtist = function(event){
	event.preventDefault();

	var searchTerm = $('#artist').val();
	var url = "https://api.spotify.com/v1/search?type=artist&query=" + searchTerm;

	$.ajax({
	  url: url,
	  data: "",
	  success: handleSuccess,
	  error: handleError,
	  dataType: 'json'
	});

};

function handleSuccess (response) { // response comes from jQuery
	
	for (var i = 0; i < response.artists.items.length; i++) {
		console.log(i);
		var artistName = response.artists.items[i].name;
		$('.js-artists-list').append('<li>' + artistName + '</li>');

		if(response.artists.items[i].images[1]) {
			var artistImage = response.artists.items[i].images[1].url;
			$('.js-artists-list').append('<img src="' + artistImage + '">');
		}

	}

}

function handleError (xhr, code_status, error) {
	console.log("Errrrrrrror")	
}

$('form').on('submit', getArtist)
