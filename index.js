// Libraries
const fs       = require('fs').promises;
const inquirer = require('inquirer');

const fileName = 'logo.svg';

const messages = {
	fileOutput: `Generated ${fileName}`
};

const prompts = {
	colorShape: {
		type:    'input',
		name:    'shapeColor',
		message: 'What color do you want your shape?\n'
	},
	colorText: {
		type:    'input',
		name:    'textColor',
		message: 'What color do you want your text?\n'
	},
	contentText: {
		type:    'input',
		name:    'content',
		message: 'What text do you want used in your logo?\n'
	},
	shapes: {
		type:    'list',
		name:    'shapes',
		message: 'Choose a shape for your logo:',
		choices: ['circle','rectangle','square','triangle']
	}
};
