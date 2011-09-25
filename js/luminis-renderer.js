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
			var paper = Raphael(option.id, option.size, option.size);
		
			if (option.axis) {
				paper.path(verticalAxis(option.size)).attr({stroke: 'gray'});
				paper.path(horizontalAxis(option.size)).attr({stroke: 'gray'});
			}
		
			if (option.projection) {
				var viewport = option.viewport;
				var scene2D = scene.transform(option.projection);
				var sceneElements = scene2D.elements
				for (var i = 0; i < sceneElements.length; i++) {
					var point = viewport(sceneElements[i]);
					paper.circle(point.e(1),point.e(2),3).attr({fill: 'black', stroke: 'black'});
				}
			}
		}
	}
	
	var horizontalAxis = function(size) {
		return axis(0, size/2, size, size/2);
	}
	
	var axis = function(x0, y0, x1, y1) {
		return "M" + x0 + " " + y0 + "L" + x1 + " " + y1;
	}
	
	var verticalAxis = function(size) {
		return axis(size/2, 0, size/2, size);
	}
}
