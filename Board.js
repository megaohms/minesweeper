import React, {Component} from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
    state = {
      boxes: [
        // [{ val: 1 },{ val: -1 }],
        // [{ val: 1 }, { val: 1 }]
      ]
    };

    componentDidMount = () => {
      this.makeGrid();
    };

    makeGrid = () => {
      var rows = [];
      for (var i = 0; i < this.props.rows; i++) {
        var row = [];
        for (var j = 0; j < this.props.rows; j++) {
          row.push({ val: 0, revealed: false });
        }
        rows.push(row);
      }
      this.assignBombs(rows);
    };

    assignBombs = (rows) => {
        var bombsLocale = {};
        for (var i = 0; i < this.props.bombs; i++) {
          var row = Math.floor(Math.random()*this.props.rows);
          var col = Math.floor(Math.random()*this.props.rows);
          rows[row][col].val = -1;
          if (bombsLocale.hasOwnProperty(row)) {
            if (bombsLocale.indexOf(row) > -1) {
              i--;
            }
            else {
              bombsLocale.push(col);
              rows = this.incrementAdjacent(row, col, rows);
            }
          }
          else {
            bombsLocale[row] = [col];
            rows = this.incrementAdjacent(row, col, rows);
          }
        }
        this.setState({ boxes: rows });
    };

    incrementAdjacent = (i, j, rows) => {
      for (var up = i - 1; up <= (i + 1); up++) {
        if (!rows.hasOwnProperty(up)) {
          continue;
        }
        for (var left = j - 1; left <= (j + 1); left++) {
          if (!rows.hasOwnProperty(left)) {
            continue;
          };
          if (rows[up][left].val > -1) {
            console.log("from ", i, " ", j, " incremementing ", left, ' ', up)
            rows[up][left].val = rows[up][left].val + 1;
          }
        }
      }
      return rows;
    };

    revealSquare = () => {};

    render() {
        return (
            <div className="board">
                { this.state.boxes.map((row, i) =>
                  <div className="board--row" key={i}>
                    { row.map((square, j) =>
                      <Square value={square.val} key={j}/>
                    )}
                  </div>
                )}
            </div>
        );
    }
}

module.exports = Board;
