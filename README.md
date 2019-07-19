![demo](http://www.giphy.com/gifs/eHjcw2Ek7v8HfeB2Hb)

## Table of contents:
- [Description](#Description)
- [Future work](#Future work)
- [Install instructions](#Install-instructions)
- [License](#License)

## Description
This is an interpretation of the famous Bubble Shooter game. I haven't done this the popular way by using HTML5's <\canvas\> element. It has all been done with a simple two-dimensional array and CSS animation to animate the shot bubble. When you shoot a bubble a trajectory of the array elements the shot bubble passes through is being calculated. For every element it checks if there's a collision with another bubble. Once it hits a bubble, it checks the color. If the colors match I run a recursive function to check if the adjacent bubbles are of the same color too. If there are more than 3 adjacent bubbles of the same color they get removed and you increment your score. The more aligning bubbles of the same color, the higher the score. Each game lasts 2 minutes.

## Future work
- Write high scores to a database and show them on screen
- Enable bubbles to bounce off the walls

## Technologies used
- React Hooks/Context
- TypeScript

## Install instructions
```
$ npm install
$ npm start
```
