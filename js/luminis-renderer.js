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

var perspective = function(camera,distance) {
	var normal = camera.x(-1).toUnitVector();
	var anchor = camera.add(normal.x(distance));
	var viewPlane = Plane.create(anchor, normal);
	var orthogonals = function(normal) {
		var a = normal.e(1); var b = normal.e(2); var c = normal.e(3);
		var o1; var o2;
		if (a != 0) {
			o1 = Vector.create([-b/a, 1, 0]);
			var x = o1.e(1);
			o2 = Vector.create([-c/(a-b*x), x*c/(a-b*x), 1]);
		} else if(b != 0) {
			o1 = Vector.create([1, 0, 0]);
			o2 = Vector.create([0, 1, -b/c]);
		} else {
			o1 = Vector.create([1, 0, 0]);
			o2 = Vector.create([0, 1, 0]);
		}
		return [o1, o2];
	}
	var o = orthogonals(normal);
	return function(v) {
		var line = Line.create(v, camera);
		var point = viewPlane.intersectionWith(line);
		return Vector.create([o[0].dot(point), o[1].dot(point)]);
	};
};

var viewportTransform = function(scale, center) {
	return function(v) {return v.x(scale).add(center);};
}

var SceneRenderer = function(options) {
	this.render = function(scene) {
		for (var index = 0; index < options.length; index++) {
			var option = options[index];
			var paper;
			if (option.paper) {
				paper = option.paper;
			} else {
				paper = Raphael(option.id, option.size, option.size);
				option.paper = paper;			
			}
			paper.clear();
		
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
