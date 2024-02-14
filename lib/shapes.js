class Shapes {
	content = '';
	id      = '';
	params  = {};
	shape   = '';
	svg     = undefined;

	constructor(svg, params) {
		//
		this.id  = 'Shape_' + this.generateID();
		this.svg = svg;
		this.svg.addElement(this);

		// Width & Height
		if (params.shape !== 'circle') {
			// A square is a rectangle, so set the height to the width, and go from there.
			if (params.hasOwnProperty('width')) this.setWidth(params.width);
			if (params.hasOwnProperty('height')) this.setHeight(params.height);
		} else this.shape = 'circle';

		// X and Y
		if (params.hasOwnProperty('x') && params.hasOwnProperty('y'))
			this.setPos(params.x, params.y);

		// Color fill
		if (params.hasOwnProperty('fill')) this.setFill(params.fill);
	}

	// Generate a random ID for the shape, in case multiple shapes are desired.
	generateID() {
		// Character Pool
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let genID        = '';

		//  Loop through the character length.
		// 3 characters should be enough to avoid a collision [1:17,576].
		for (let i = 0; i < 3; i++) {
			genID += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		// Return the ID
		return genID;
	}

	// Function to calculate the center coordinates for a polygon.
	getPolyCentroid(points) {
		//  Return an array [x, y]
		return [Math.floor(points.reduce((sum, point) => sum + point[0], 0) / points.length),
		        Math.floor(points.reduce((sum, point) => sum + point[1], 0) / points.length)];
	}

	render(item) {
		let params = '';

		console.log(this.params);
		// Loop through the parameters and append them to a string to be used in the tag.
		for (let [key, value] of Object.entries(this.params)) {
			// If working with points, collapse the first level of the array.
			if (Array.isArray(value)) value = value.join(' ');
			params += `${key}="${value}" `;
		}

		// Return the shape with, with ID, and any specified parameters.
		// If there is no content, make it a self-closing tag, otherwise include the content and then close.
		return `<${this.shape} id="${this.id}" ${params}` + ((!this.content.length) ? `/>` : `>${this.content}</${this.shape}>`);
	}

	setFill(color) {
		this.params.fill = color;
	}

	setPos(x, y) {
		if (this.shape === 'circle') {
			// Set position based on circle center
			this.params.cx = x;
			this.params.cy = y;
		} else {
			// Set position based on upper left corner
			this.params.x = x;
			this.params.y = y;
		}
	}

	// Gets the rotational point and saves the transformation.
	setRotation(degrees) {
		const centroid        = this.getPolyCentroid(this.params.points);
		this.params.transform = `rotate(${degrees} ${centroid[0]} ${centroid[1]})`;
	}
}

class Circle extends Shapes {
	shape = 'circle';

	constructor(svg, params = {}) {
		params = {
			shape: 'circle',
			cx:    0,
			cy:    0,
			r:     0,
			...params
		};
		//  Call the parent constructor with the defaults
		super(svg, params);

		// Radius
		if (params.hasOwnProperty('radius')) this.setRadius(params.radius);
	}

	// Set the radius of the circle.
	setRadius(radius) {
		this.params.r = radius;
	}
}

class Rectangle extends Shapes {
	shape = 'rect';

	constructor(svg, params) {
		params = {
			shape:  'rect',
			width:  0,
			height: 0,
			...params
		};
		//  Call the parent constructor with the defaults
		super(svg, params);
	}

	setHeight(height) {
		this.params.height = height;
	}

	setWidth(width) {
		this.params.width = width;
	}
}

// Square class
class Square extends Rectangle {

	constructor(svg, params) {
		params = {
			shape: 'rect',
			width: 0,
			...params,
			height: params.width
		};
		//  Call the parent constructor with the defaults
		super(svg, params);
	}
}

class Text extends Shapes {
	shape = 'text';

	constructor(svg, params = {}) {
		params = {
			shape: 'text',
			x: 0,
			y: 0,

			'dominant-baseline': 'middle',
			'text-anchor':       'middle',
			'font-family':       'sans-serif',
			...params
		};

		// Call parent constructor
		super(svg, params);

		// Set the text, if defined.
		if (params.hasOwnProperty('content')) this.setText(params.content);

		// Font
		if (params.hasOwnProperty('fontFamily')) this.setFontFamily(params.fontFamily);
		if (params.hasOwnProperty('fontSize')) this.setFontSize(params.fontSize);
	}

	setFontFamily(font) {
		this.params['font-family'] = `${font}, sans-serif`;
	}

	setFontSize(size) {
		this.params['font-size'] = size;
	}

	setText(text) {
		if (text.length <= 3) this.content = text;
	}
}

class Triangle extends Shapes {

	constructor(svg, params = {}) {
		params = {
			shape:  'polygon',
			points: [[], [], []],
			...params
		};
		// Call parent constructor
		super(svg, params);

		//  Rotation; when added to other objects, this can be moved to Shape.constructor under the Circle exclusion.
		if (params.hasOwnProperty('rotate')) this.setRotation(params.rotate);
	}

	// Set the height of Triangle
	setHeight(height) {
		this.params.points[0][1] = 0;        // Top
		this.params.points[1][1] = +height;  // Right
		this.params.points[2][1] = +height;  // Left
	}

	// Set the width of the Triangle
	setWidth(width) {
		this.params.points[0][0] = +width / 2; // Top
		this.params.points[1][0] = 0;          // Right
		this.params.points[2][0] = +width;     // Left
	}

	// Sets the points for the triangle; width and height must be set first.
	setPos(x, y) {
		// Adjust the offset of each point by adding x and y.
		this.params.points.forEach(point => {
			point[0] += +x;
			point[1] += +y;
		});
	}
}

// Export modules
module.exports = {Circle, Rectangle, Square, Text, Triangle};