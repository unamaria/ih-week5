var PokedexModel = function () {
	this.url = "/api/pokedex"
}

PokedexModel.prototype.fetch = function (callback) {
	var request = $.get(this.url)
	var pokedex = this;
	request.done(function(results) {
		var pokeInfo = results.objects[0].pokemon
		$.extend(pokedex, pokeInfo)
		callback();
	})
}

module.exports = PokedexModel;