## [ Check out the deployed app here!](https://bubble-shooter-game.herokuapp.com/)

![demo](https://media.giphy.com/media/eHjcw2Ek7v8HfeB2Hb/giphy.gif)

## Table of contents:
- [Technologies used](#Technologies-used)
- [Server](#Server)
- [Description](#Description)
- [Install instructions](#Install-instructions)
- [Future work](#Future-work)

## Technologies used
- React
- React Hooks & Context
- TypeScript

## Server
The repository for the server can be found [here](https://github.com/davemollen/bubble-shooter-server)

## Goal
The goal for this project was to get more practice with algorithms, React Hooks & Context and TypeScript. 

## Description
This is an interpretation of the famous Bubble Shooter game. I haven't done this the popular way by using the HTML5 <canvas\> element. It has all been done with a simple two-dimensional array and CSS animation to animate the shot bubble. When you shoot a bubble a trajectory of the array elements the shot bubble passes through is being calculated. For every element it checks if there's a collision with another bubble. Once it hits a bubble, it checks the color. If the colors match I run a [recursive function](/src/actions/gameActions.tsx#L98) to check if the adjacent bubbles are of the same color too. If there are more than 3 adjacent bubbles of the same color they get removed and you increment your score. And the more aligning bubbles of the same color for each shot, the higher the score. Each game lasts 2 minutes.

## Install instructions
```
$ npm install
$ npm run start
```

## Future work
- Enable bubbles to bounce off the walls
