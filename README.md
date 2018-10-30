# Dockerized Angular Game Of Life

Docker and Angular Projet to illustrate the John Conway's Game of Life.

You can find more about this project here :  https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

This project was generated with Angular CLI version 7.0.2. 

It is composed of two containers : 

*    gol_angular : Angular
*    gol_nginx : Nginx 


## Prerequisites

This project requires npm to init the Angular dependencies.
 
You can find more about the npm installation here : https://www.npmjs.com/get-npm

## Getting Started

Clone the project by using the following command :

```
git clone https://github.com/AdriBalla/AngularGameOfLife.git
```

## Init Angular

The first step is to build the dependencies of the Angular project

```
make init
```

## Run the Angular Docker

```
make up
```

## Access the Angular container

The angular container is available on localhost:80

The angular folder inside the project is shared into the angular container so the modifications applied to the file are synched into te container.

## Kill the Angular Docker


```
make kill
```

## Controls

- Refresh button : restart the grid
- Play button : start the Game of Life
- Stop button : stop the generation

## Customizing the starting grid

The height and width of the grid can be chosen.
You can click on a cell to change its state.

