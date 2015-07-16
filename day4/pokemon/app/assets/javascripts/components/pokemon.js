var PokemonComponent = function (container, pokemon) {
	this.pokemon = pokemon
	this.container = container
}


PokemonComponent.prototype.template = function (pokemon) {
	var pokeInfo = '<h2>' + pokemon.name + '</h2>' +
									'<ul><li>Height: ' + pokemon.height + '</li>' +
									'<li>Weight: ' + pokemon.weight + '</li>' +
									'<li>Speed: ' + pokemon.speed + '</li></ul>';
	return pokeInfo;
}

PokemonComponent.prototype.render = function () {
	this.container.html(this.template(this.pokemon))
}

module.exports = PokemonComponent;