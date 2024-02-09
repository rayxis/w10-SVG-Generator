// Libraries
const fs       = require('fs').promises;
const inquirer = require('inquirer');
const SVG      = require('./lib/svg');

// Import shapes
const {Circle, Rectangle, Square, Text, Triangle} = require('./lib/shapes');

// Validate functions
checkValidation = {
	// Check if entry is a number.
	number: (value) => {
		if (value.endsWith('%')) value = value.slice(0, -1);
		return (!isNaN(+value)) || 'Please enter numbers only.';
	},
	// Check if entry is a percentage or number.
	percent: (value) => {
		if (value.endsWith('%')) value = value.slice(0, -1);
		return (!isNaN(+value)) || 'Please enter numbers or percentages only.';
	},
	// Check text length.
	textLength: (value) => (value.length <= 3) || 'Please enter up to 3 characters.'
};
// User Prompts
const prompts   = {
	colorFill:   {
		type:    'input',
		name:    'fill',
		message: 'Fill color [hex code or keyword]: '
	},
	contentText: {
		type:     'input',
		name:     'content',
		message:  'Logo text (3 Characters): ',
		validate: checkValidation.textLength
	},
	fileName:    {
		type:    'input',
		name:    'fileName',
		message: 'Save file as: ',
		default: 'logo.svg'
	},
	fontFamily:  {
		type:    'list',
		name:    'fontFamily',
		message: 'Select a font:',
		default: 'Impact',
		choices: ['Arial', 'Georgia', 'Oswald', 'Times New Roman']
	},
	fontSize:    {
		type:     'input',
		name:     'fontSize',
		message:  'Font Size: ',
		default:  64,
		validate: checkValidation.number
	},
	height:      {
		type:     'input',
		name:     'height',
		message:  'Height: ',
		validate: checkValidation.percent
	},
	posX:        {
		type:     'input',
		name:     'x',
		message:  'Position (x-axis): ',
		validate: checkValidation.percent
	},
	posY:        {
		type:     'input',
		name:     'y',
		message:  'Position (y-axis): ',
		validate: checkValidation.percent
	},
	radius:      {
		type:     'input',
		name:     'radius',
		message:  'Radius: ',
		validate: checkValidation.number
	},
	rotate:      {
		type:     'input',
		name:     'rotate',
		message:  'Rotate (degrees): ',
		validate: checkValidation.number
	},
	shapes:      {
		type:    'list',
		name:    'shapes',
		message: 'Add an element:',
		choices: ['Circle', 'Rectangle', 'Square', 'Triangle', 'Text', 'Done']
	},
	width:       {
		type:     'input',
		name:     'width',
		message:  'Width: ',
		validate: checkValidation.percent
	}
};

// Prompt the user with questions
async function promptUser(promptList) {
	// Return results
	return await inquirer.prompt(promptList.map(prompt => prompts[prompt]));
}

// Self-executing function to build questions, and render out a file
(async () => {
	let svg = new SVG(300, 200);
	let shapeType;

	do {
		let questions = [];
		let shapeClass;
		shapeType     = await promptUser(['shapes']);

		switch (shapeType.shapes) {
			case 'Circle':
				questions  = ['radius', 'posX', 'posY', 'colorFill'];
				shapeClass = Circle;
				break;
			case 'Square':
				questions        = ['width', 'posX', 'posY', 'colorFill'];
				shapeClass       = Square;
				break;
			case 'Rectangle':
				questions  = ['width', 'height', 'posX', 'posY', 'colorFill'];
				shapeClass = Rectangle;
				break;
			case 'Text':
				questions  = ['contentText', 'posX', 'posY', 'colorFill', 'fontFamily', 'fontSize'];
				shapeClass = Text;
				break;
			case 'Triangle':
				questions  = ['width', 'height', 'posX', 'posY', 'rotate', 'colorFill'];
				shapeClass = Triangle;
				break;
			case 'Done':
				continue;
			default:
		}

		// Ask user questions, and create a new object from the responses.
		new shapeClass(svg, await promptUser(questions));

	} while (shapeType.shapes !== 'Done'); // Loop until user is Done.

	// If the user is done, save the file.
	promptUser(['fileName']).then(response => svg.renderToFile(response.fileName));
})();