import React, {Component} from 'react';
import './Square.css';

class Square extends Component {
    // props.value // if -1, is a bomb, if 0, don't show number

    state = {
      revealed: false
    }

    reveal = () => {
      this.setState({
        revealed: true
      });
    }

    render() {
      var inner = null;
        if (this.props.value < 0 && this.state.revealed) {
            inner = (
              <div className="square--revealed-bomb">
                <span className="fa fa-bomb fa-bomb">
                </span>
              </div>
            )
        }
        else {
          // todo: handle event for case of value === 0
          inner = (
            <div className="square--number">
                { this.state.revealed ? this.props.value : '' }
            </div>
          )
        }
        return (
          <div className="square" onClick={this.reveal}>
            { inner }
          </div>
        );
    }
}

module.exports = Square;
