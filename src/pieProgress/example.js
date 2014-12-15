Game = {};

Game.Load = function (game) { };

Game.Load.prototype = {
	preload: function () {
		var color = '#8b34c8';
		game.stage.backgroundColor = '#3c3640';

		var pieProgress = new PieProgress(game, game.world.centerX, game.world.centerY, 128, color, null, 0.02);
		game.world.add(pieProgress);
		
		game.load.onFileComplete.add(this.fileComplete, this);
	},

	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		this.pieProgress.progress = progress/100.0;
	}
};