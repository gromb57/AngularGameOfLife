import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  readonly ALIVE = true;
  readonly DEAD = false;

  /**
   * Value of the Width input
   * @type {number}
   * @private
   */
  @Input() private _inputWidth = 80;

  /**
   * Width of the grid
   * @type {any[]}
   */
  width = new Array(this._inputWidth);

  /**
   * Getter for the inputWidth
   * @returns {number}
   */
  get inputWidth(): number {
    return this._inputWidth;
  }

  /**
   * Setter for the inputWidth
   * @param value
   */
  set inputWidth(value: number) {
    this._inputWidth = value;
    this.width = new Array(+value);
    this.initGrid();
  }

  /**
   * Value of the height input
   * @type {number}
   * @private
   */
  @Input() private _inputHeight = 50;

  /**
   * Height of the grid
   * @type {any[]}
   */
  height = new Array(this._inputHeight);

  /**
   * Getter for the inputHeight
   * @returns {number}
   */
  get inputHeight(): number {
    return this._inputHeight;
  }

  /**
   * Setter for the inputHeight
   * @param value
   */
  set inputHeight(value: number) {
    this._inputHeight = value;
    this.height = new Array(+value);
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

    for(var x=0; x< this.width.length; x++){
      for(var y=0; y< this.height.length; y++){
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

    var aliveNeightbours = 0;
    var nextState=null;

    for (var i = x-1 ; i <= x +1 ; i++){
      for (var j = y-1 ; j <= y +1 ; j++){
        if ((x !=i || y != j) && this.grid[i] && this.grid[i][j] && this.grid[i][j] == this.ALIVE) {
          aliveNeightbours++;
        }
      }
    }

    //Next state according to how many neighbour cell are alive
    switch (aliveNeightbours){
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

    for(var x= 0; x < this.width.length; x++) {
      for(var y= 0; y < this.height.length; y++) {
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
