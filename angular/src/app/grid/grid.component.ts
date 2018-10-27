import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  readonly ALIVE = true;
  readonly DEAD = false;

  @Input() private _inputSize = 50;

  size = new Array(this.inputSize);

  get inputSize(): number {
    return this._inputSize;
  }

  set inputSize(value: number) {
    this._inputSize = value;
    this.size = new Array(+value);
    this.initGrid();
  }

  /**
   *
   * @type {Array}
   */
  grid = [];

  /**
   * Interval of the generations
   * @type interval
   */
  interval;

  /**
   * Index of the current Generation
   * @type number
   */
  indexGeneration = 0;


  constructor() {}

  ngOnInit() {
    this.initGrid();
  }

  /**
   * Initialisation of the grid
   */
  initGrid() {

    this.stop();

    for(var x=0; x< this.size.length; x++){
      for(var y=0; y< this.size.length; y++){
        if (this.grid[x] == null){
          this.grid[x] = []
        }
        this.grid[x][y] = this.DEAD;
      }
    }
  }

  /**
   * Triggered when cell is clicked
   *
   * @param int x
   * @param int y
   * @returns String
   */
  onClick(x,y){
    this.grid[x][y] = !this.grid[x][y];
  }


  /**
   * Get the Cell value
   *
   * @param x
   * @param y
   * @returns {boolean}
   */
  getCell(x,y){
    return this.grid[x][y];
  }

  /**
   * Calculate the next state of a Cell
   * @param number x
   * @param number y
   * @returns String
   */
  nextStateForCell(x,y){

    var neightbours = Array();
    var maxSize = this.size.length -1;
    var nextState=null;

    //Left side of the cell
    if (y != 0){
      neightbours.push(this.grid[x][y-1]);

      if (x != 0){
        neightbours.push(this.grid[x-1][y-1]);
      }

      if (x != maxSize){
        neightbours.push(this.grid[x+1][y-1]);
      }
    }

    //Middle
    if (x != 0){
      neightbours.push(this.grid[x-1][y]);
    }

    if (x < maxSize){
      neightbours.push(this.grid[x+1][y]);
    }

    //Right side of the cell
    if (y < maxSize){
      neightbours.push(this.grid[x][y+1]);

      if (x != 0){
        neightbours.push(this.grid[x-1][y+1]);
      }

      if (x != maxSize){
        neightbours.push(this.grid[x+1][y+1]);
      }
    }

    //Test how many alive
    var aliveCells = 0;
    for(var idx= 0; idx < neightbours.length; idx++) {
      if (neightbours[idx] == this.ALIVE){
        aliveCells++;
      }
    }

    //Next state according to how many neighbour cell are alive
    switch (aliveCells){
      case 3:
        nextState = this.ALIVE;
        break;
      case 2 :
        nextState = this.grid[x][y];
        break;
      default :
        nextState = this.DEAD;
    }

    return nextState;
  }

  /**
   * Generate next state for the whole current grid
   */
  generateNextGrid(){

    var nextGrid = [];

    for(var x= 0; x < this.size.length; x++) {
      for(var y= 0; y < this.size.length; y++) {
        if (nextGrid[x] == null){
          nextGrid[x] = [];
        }
        nextGrid[x][y] = this.nextStateForCell(x,y);
      }
    }

    this.indexGeneration++;

    this.grid = nextGrid;
  }

  /**
   * Run the generation
   */
  run() {
    this.stop();
    this.interval = setInterval(() => this.generateNextGrid(), 100);
  }

  /**
   * Stop the Interval
   */
  stop(){
    if (this.interval != null){
      clearInterval(this.interval);
    }
    this.indexGeneration = 0;
  }


}
