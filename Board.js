import React, {Component} from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
    state = {
      boxes: [],
      bombs: {}
    };

    componentDidMount = () => {
      this.makeGrid();
    };

    componentWillReceiveProps = (next) => {
      this.makeGrid(next.rows, next.bombs);
    }

    makeGrid = (numRows=this.props.rows, numBombs=this.props.bombs) => {
      var rows = [];
      for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numRows; j++) {
          row.push({ val: 0, revealed: false });
        }
        rows.push(row);
      }
      this.assignBombs(rows, numRows, numBombs);
    };

    assignBombs = (rows, numRows, numBombs) => {
        var bombsLocale = {};
        for (var i = 0; i < numBombs; i++) {
          var row = Math.floor(Math.random()*numRows);
          var col = Math.floor(Math.random()*numRows);
          rows[row][col].val = -1;
          if (bombsLocale.hasOwnProperty(row)) {
            if (bombsLocale[row].indexOf(col) > -1) {
              i--;
            }
            else {
              bombsLocale[row].push(col);
              rows = this.incrementAdjacent(row, col, rows);
            }
          }
          else {
            bombsLocale[row] = [col];
            rows = this.incrementAdjacent(row, col, rows);
          }
        }
        this.setState({ boxes: rows, bombs: bombsLocale });
    };

    incrementAdjacent = (i, j, rows) => {
      for (var up = i - 1; up <= (i + 1); up++) {
        if (!rows.hasOwnProperty(up)) {
          continue;
        }
        for (var left = j - 1; left <= (j + 1); left++) {
          if (!rows[up].hasOwnProperty(left)) {
            continue;
          };
          if (rows[up][left].val > -1) {
            rows[up][left].val = rows[up][left].val + 1;
          }
        }
      }
      return rows;
    };

    // todo: refactor click handler from Square to be here
    revealSquare = (pos, boxes=this.state.boxes) => {
      boxes[pos[0]][pos[1]].revealed = true;
      var i = pos[0];
      var j = pos[1];
      if (boxes[i][j].val === 0) {
        for (var up = i - 1; up <= (i + 1); up++) {
          if (!boxes.hasOwnProperty(up)) {
            continue;
          }
          for (var left = j - 1; left <= (j + 1); left++) {
            if (i === up && j === left) {
              continue;
            }
            if (!boxes[up].hasOwnProperty(left)) {
              continue;
            }
            if (!boxes[up][left].revealed) {
              this.revealSquare([up, left], boxes);
            }
          }
        }
      }
      this.setState({ boxes });
    };

    reset = () => {
      this.makeGrid();
    }

    endGame = () => {

    }

    render() {
        return (
          <div className="board-wrapper">
            <div className="board-title">
              {'Minesweeper'}
            </div>
            <div className="counter">{this.state.counter}</div>
            <div className="reset-button" onClick={this.reset}>
              {'reset'}
            </div>
            <div className="board">
                { this.state.boxes.map((row, i) =>
                  <div className="board--row" key={i}>
                    { row.map((square, j) =>
                      <Square info={square} pos={[i,j]} revealSquare={this.revealSquare} key={j}/>
                    )}
                  </div>
                )}
            </div>
          </div>
        );
    }
}

module.exports = Board;
