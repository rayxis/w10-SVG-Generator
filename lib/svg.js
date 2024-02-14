const fs = require('fs');

// Class to handle SVG objects
class SVG {
	elements = [];
	width    = 0;
	height   = 0;

	// Set the height and width of the SVG file
	constructor(width, height) {
		this.width  = width;
		this.height = height;
	}

	// Add an element class to the array.
	addElement(elementClass) {
		this.elements.push(elementClass);
	}

	// Render out the image
	renderAll() {
		// Initialize content
		let content = '';

		// Loop through and render each element in the array.
		this.elements.forEach(elementClass => content += elementClass.render(elementClass));

		// Return built SVG
		return `<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">` +
		       `<g>${content}</g>` +
		       `</svg>`;
	}

	// Function to output the file.
	renderToFile(fileName) {
		// Output the rendered file, and notify the user that the process is complete.
        fs.writeFileSync(fileName, this.renderAll());
		console.log(`Generated ${fileName}.`);
	}
}

module.exports = SVG;