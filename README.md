# SVG Generator

## Description



## Installation

For installation, copy the files to your location of choice and execute: 

## Usage

In

### Execution

```shell
node svggen.js
```

### Demonstration

A link to a video demonstration for this can be found here: https://youtu.be/5vsBOoUux5g

### Future Plans

There are several ideas that I was entertaining for this project. Unfortunately, due to time constraints, I wasn't 
able to push them out just yet. In future a version, I would like to add:
- CSS
- Shading
- Rotation on more than triangles
- Better font selection
- and ability to edit. 

## User Story
```
AS a freelance web developer
I WANT to generate a simple logo for my projects
SO THAT I don't have to pay a graphic designer
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I am prompted for text
THEN I can enter up to three characters
WHEN I am prompted for the text color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I am prompted for a shape
THEN I am presented with a list of shapes to choose from: circle, triangle, and square
WHEN I am prompted for the shape's color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I have entered input for all the prompts
THEN an SVG file is created named `logo.svg`
AND the output text "Generated logo.svg" is printed in the command line
WHEN I open the `logo.svg` file in a browser
THEN I am shown a 300x200 pixel image that matches the criteria I entered
```