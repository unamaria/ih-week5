var PokedexComponent = function (container, pokedex) {
	this.pokedex = pokedex
	this.container = container
}

PokedexComponent.prototype.template = function (pokedex) {
 	var names = "";
 	for (var pokemon in pokedex) {
 		if(pokedex[pokemon].resource_uri){
	 		var resource = pokedex[pokemon].resource_uri.substring(15);
	 		var id = parseInt(resource);
			names = names + 
							'<li><a class="js-pokemon" href="javascript:;" ' +
							'data-id="' + id + '" >' + 
							pokedex[pokemon].name + 
							'</a></li>'
 		}
 	}	
 	return names
}

PokedexComponent.prototype.render = function () {
	this.container.html(this.template(this.pokedex))

	function createPokemonListener () {
		$('.js-pokemon').on('click', function (event) {
			event.preventDefault();
			$('.pokedex-list').fadeOut();
			router.renderPokemonComponent(this.getAttribute('data-id'));
		})
	}

	createPokemonListener();
}



module.exports = PokedexComponent;