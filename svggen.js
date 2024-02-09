// Libraries
const fs       = require('fs').promises;
const inquirer = require('inquirer');
const SVG      = require('./lib/svg');

// Import shapes
const {Circle, Rectangle, Text, Triangle} = require('./lib/shapes');

const prompts = {
	colorFill:   {
		type:    'input',
		name:    'fill',
		message: 'Fill color [hex code or keyword]: '
	},
	contentText: {
		type:     'input',
		name:     'content',
		message:  'Logo text (3 Characters): ',
		validate: (value) => {
			return (value.length <= 3) || 'Please enter up to 3 characters.';
		}
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
		validate: (value) => {
			return (!isNaN(+value)) || 'Please enter numbers only.';
		}
	},
	height:      {
		type:     'input',
		name:     'height',
		message:  'Height: ',
		validate: (value) => {
			if (value.endsWith('%')) value = value.slice(0, -1);
			return (!isNaN(+value)) || 'Please enter numbers or percentages only.';
		}
	},
	posX:        {
		type:     'input',
		name:     'x',
		message:  'Position (x-axis): ',
		validate: (value) => {
			if (value.endsWith('%')) value = value.slice(0, -1);
			return (!isNaN(+value)) || 'Please enter numbers or percentages only.';
		}
	},
	posY:        {
		type:     'input',
		name:     'y',
		message:  'Position (y-axis): ',
		validate: (value) => {
			if (value.endsWith('%')) value = value.slice(0, -1);
			return (!isNaN(+value)) || 'Please enter numbers or percentages only.';
		}
	},
	radius:      {
		type:     'input',
		name:     'radius',
		message:  'Radius: ',
		validate: (value) => {
			return (!isNaN(+value)) || 'Please enter numbers only.';
		}
	},
	rotate:      {
		type:     'input',
		name:     'rotate',
		message:  'Rotate (degrees): ',
		validate: (value) => {
			return (!isNaN(+value)) || 'Please enter numbers only.';
		}
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
		validate: (value) => {
			if (value.endsWith('%')) value = value.slice(0, -1);
			return (!isNaN(+value)) || 'Please enter numbers or percentages only.';
		}
	}
};

async function promptUser(promptList) {
	// Return results
	return await inquirer.prompt(promptList.map(prompt => prompts[prompt]));
}

(async () => {
	let svg = new SVG(300, 200);
	let shapeType;

	do {
		let questions = [];
		let shape, shapeClass;
		shapeType     = await promptUser(['shapes']);

		switch (shapeType.shapes) {
			case 'Circle':
				questions  = ['radius', 'posX', 'posY', 'colorFill'];
				shapeClass = Circle;
				break;
			case 'Square':
				questions  = ['width', 'posX', 'posY', 'colorFill'];
				questions.height = questions.width;
				shapeClass = Square;
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

		const response = await promptUser(questions);
		shape = new shapeClass(svg, response);

	} while (shapeType.shapes !== 'Done');

	// If the user is done, save the file.
	promptUser(['fileName']).then(response => svg.renderToFile(response.fileName));
})();