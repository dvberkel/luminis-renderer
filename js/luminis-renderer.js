var Scene3D = function() {
	var Scene2D = function() {
		this.elements = [];
	
		this.add = function(element) {
			this.elements.push(element);
			return this;			
		}
	}
	this.__proto__ = new Scene2D();
	
	this.transform = function(transformation) {
		var scene2D = new Scene2D();
		for (var i = 0; i < this.elements.length; i++) {
			scene2D.add(transformation(this.elements[i]));
		}
		return scene2D;
	}
}
	
var projection = function(m) {
	var matrix = Matrix.create(m);
	return function(v) {return matrix.multiply(v);};
}

var viewportTransform = function(scale, center) {
	return function(v) {return v.x(scale).add(center);};
}

var SceneRenderer = function(options) {
	this.render = function(scene) {
		for (var index = 0; index < options.length; index++) {
			var option = options[index];
			var paper = Raphael(option.id, 480, 480);
		
			if (option.axis) {
				paper.path("M240 0L240 480").attr({stroke: 'gray'});
				paper.path("M0 240L480 240").attr({stroke: 'gray'});
			}
		
			if (option.projection) {
				var scene2D = scene.transform(option.projection);
				var sceneElements = scene2D.elements
				for (var i = 0; i < sceneElements.length; i++) {
					var point = option.viewport(sceneElements[i]);
					paper.circle(point.e(1),point.e(2),3).attr({fill: 'black', stroke: 'black'});
				}
			}
		}
	}
}
