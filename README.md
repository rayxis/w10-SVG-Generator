# SVG Generator

## Description

This is an SVG Generator that operates on the command line and outputs an SVG file based off of user-defined criteria.

## Installation

For installation, copy the files to your location of choice and execute: 

## Usage

### Execution

To get started, on your terminal type:

```shell
node svggen.js
```

Once inside the application, you'll be greeted with a menu with the options to add various elements to your SVG file:
- Circle
- Rectangle
- Square
- Triangle
- Text


Each option will provide you with several questions to build the attributes for your image, some of them are unique, 
while others are shared. For example: for each item, you'll be asked for the x and y coordinates and a color fill; but 
with `Circle`, you'll also be asked for the radius; for `Square`, `Rectangle`, and `Triangle` you'll be asked for 
the width and height; and for `Text`, you'll naturally be asked for the text content, the font family, and the font 
size.

Once you are done, select `Done` from the menu. You will then be prompted for a location to save your file. In the 
demonstration video below, I chose `./examples/logo-test1.svg`.

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