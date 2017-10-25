import React, {Component} from 'react';
import './Square.css';

class Square extends Component {

    render() {
      var inner = null;
        if (this.props.hasOwnProperty('info')) {
          if (this.props.info.val < 0 && this.props.info.revealed) {
            inner = (
              <div className="square--revealed-bomb">
                <span className="fa fa-bomb fa-bomb">
                </span>
              </div>
            )
          }
          else if (this.props.info.revealed) {
            inner = (
              <div className="square--revealed-number">
                  {this.props.info.val}
              </div>
            )
          }
        }
        return (
          <div className="square" onClick={() => this.props.revealSquare(this.props.pos)}>
            { inner }
          </div>
        );
    }
}

module.exports = Square;
