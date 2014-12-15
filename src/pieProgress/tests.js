// Phaser current version test environment
// Configurable 'pie' progress indicator ('ring' style)

var game = new Phaser.Game(400, 400, Phaser.AUTO, 'test');

var BasicGame = function(game) {};

BasicGame.Boot = function (game) {};

var pie;

BasicGame.Boot.prototype = 
{
    preload: function() {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#3c3640';
    },
	create: function() 
	{
        pie = new PieProgress(game, game.world.centerX, game.world.centerY, 32);
        game.world.add(pie);
        
        var gui = new dat.GUI();
        gui.add(pie, 'progress', 0, 1);
        gui.add(pie, 'radius', 20, 128);
        gui.add(pie, 'weight', 0, 1);
        gui.addColor(pie, 'color');
    },
    update: function() {
        
    },
    render: function()
    {
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
    }
};

var PieProgress = function(game, x, y, radius, color, angle, weight) {
    this._radius = radius;
    this._progress = 1;
    this._weight = weight || 0.25;
    this._color = color || "#fff";
    this.bmp = game.add.bitmapData((this._radius * 2) + (this._weight * (this._radius * 0.6)), (this._radius * 2) + (this._weight * (this._radius * 0.6)));
    Phaser.Sprite.call(this, game, x, y, this.bmp);
    
    this.anchor.set(0.5);
    this.angle = angle || -90;
    this.updateProgress();
}

PieProgress.prototype = Object.create(Phaser.Sprite.prototype);
PieProgress.prototype.constructor = PieProgress;

PieProgress.prototype.updateProgress = function() {
    var progress = this._progress;
    progress = Phaser.Math.clamp(progress, 0.00001, 0.99999);
    
    this.bmp.clear();
    this.bmp.ctx.strokeStyle = this.color;
    this.bmp.ctx.lineWidth = this._weight * this._radius;
    this.bmp.ctx.beginPath();
    this.bmp.ctx.arc(this.bmp.width * 0.5, this.bmp.height * 0.5, this._radius - 15, 0, (Math.PI * 2) * progress, false);
    this.bmp.ctx.stroke();
    this.bmp.dirty = true; 
};

PieProgress.prototype.updateBmdSize = function() {
    this.bmp.resize((this._radius * 2) + (this._weight * (this._radius * 0.75)), (this._radius * 2) + (this._weight * (this._radius * 0.75)));
};

Object.defineProperty(PieProgress.prototype, 'color', {
    get: function() {
        return this._color;   
    },
    set: function(val) {
        this._color = val;
        this.updateProgress();
    }
});

Object.defineProperty(PieProgress.prototype, 'radius', {
    get: function() {
        return this._radius;   
    },
    set: function(val) {
        this._radius = (val > 0 ? val : 0);
        this.updateBmdSize();
        this.updateProgress();
    }
});

Object.defineProperty(PieProgress.prototype, 'progress', {
    get: function() {
        return this._progress;   
    },
    set: function(val) {
        this._progress = Phaser.Math.clamp(val, 0, 1);
        this.updateProgress();
    }
});

Object.defineProperty(PieProgress.prototype, 'weight', {
    get: function() {
        return this._weight;   
    },
    set: function(val) {
        this._weight = Phaser.Math.clamp(val, 0.01, 0.99);
        this.updateBmdSize();
        this.updateProgress();
    }
});



game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');