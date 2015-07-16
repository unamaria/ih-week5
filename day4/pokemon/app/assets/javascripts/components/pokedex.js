var PokedexComponent = function (container, pokedex) {
	this.pokedex = pokedex
	this.container = container
}

PokedexComponent.prototype.template = function (pokedex) {
 	var names = "";
 	for (var pokemon in pokedex) {
		names = names +'<li>' + pokedex[pokemon].name + '</li>'
 	}	
 	return names
}

PokedexComponent.prototype.render = function () {
	this.container.html(this.template(this.pokedex))
}

module.exports = PokedexComponent;