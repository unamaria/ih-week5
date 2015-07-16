var PokemonModel = function (id) {
	this.id = id
	this.url = "/api/pokemon/"
}

PokemonModel.prototype.fetch = function (callback) {
	var request = $.get(this.url + this.id)
	var pokemon = this;
	request.done(function(pokemonInfo) {
		$.extend(pokemon, pokemonInfo)
		callback();
	})
}

module.exports = PokemonModel;