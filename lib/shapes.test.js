const {Circle, Rectangle, Square, Text, Triangle} = require('./shapes');

// Load the SVG library
const svg = new (require('../lib/svg'))(300, 200);

// Regular expression to remove ID attributes
const regexID = / id="[^"]*"/g;

describe('Shape classes suite', () => {
	// Test the circle class
	describe('Circle class', () => {
		it('should correctly render a circle', () => {
			const circle = new Circle(svg, {
				x:      35,
				y:      15,
				radius: 100,
				fill:   'red'
			}).render()
				// Remove the ID from the string
              .replace(regexID, '');

			expect(circle).toEqual('<circle cx="35" cy="15" r="100" fill="red" />');
		});
	});

	// Test the Rectangle class
	describe('Rectangle class', () => {
		it('should correctly render a rectangle', () => {
			const rectangle = new Rectangle(svg, {
				width:  '100%',
				height: '100%',
				x:      0,
				y:      0,
				fill:   '#1D1D1D'
			}).render()
				// Remove the ID from the string
              .replace(regexID, '');

			// This should be the result
			expect(rectangle).toEqual('<rect width="100%" height="100%" x="0" y="0" fill="#1D1D1D" />');
		});
	});

	// Test the Rectangle class
	describe('Square class', () => {
		it('should correctly render a square', () => {
			const square = new Square(svg, {
				width:  '100',
				height: '100',
				x:      0,
				y:      0,
				fill:   '#1D1D1D'
			}).render()
				// Remove the ID from the string
              .replace(regexID, '');

			// This should be the result
			expect(square).toEqual('<rect width="100" height="100" x="0" y="0" fill="#1D1D1D" />');
		});
	});

	// Test the Text class
	describe('Text class', () => {
		it('should correctly render text', () => {
			const text = new Text(svg, {
				content:    'YES',
				x:          '70%',
				y:          '50%',
				fill:       '#EEFFCC',
				fontFamily: 'Arial',
				fontSize:   '64'
			}).render()
				// Remove the ID from the string
              .replace(regexID, '');

			// This should be the result
			expect(text).toEqual('<text x="70%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" fill="#EEFFCC" >YES</text>');
		});
	});

	// Test the Triangle class
	describe('Triangle class', () => {
		it('should correctly render a triangle', () => {
			const triangle = new Triangle(svg, {
				width:  '75',
				height: '15',
				x:      190,
				y:      125,
				rotate: 90,
				fill:   'blue'
			}).render()
				// Remove the ID from the string
              .replace(regexID, '');

			// This should be the result
			expect(triangle).toEqual('<polygon points="227.5,125 190,140 265,140" transform="rotate(90 227 135)" fill="blue" />');
		});


	});
});