const fs = require('fs');

class SVG {
	elements = [];
	width    = 0;
	height   = 0;

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
		// Initialize CSS and content
		let css = '', content = '';

		// Loop through the elements and fill in the variables.
		this.elements.forEach(elementClass => {
			// css += elementClass.getCSS();
			content += elementClass.render();
		});

		// Return built SVG
		return `<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">` +
		       `<g>${content}</g>` +
		       `</svg>`;
	}

	// Output the file to
	renderToFile(fileName) {
        fs.writeFileSync(fileName, this.renderAll());
		console.log(`Generated ${fileName}.`);
	}
}

module.exports = SVG;