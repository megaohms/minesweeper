import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';

var settings = {
  1: { rows: 8, bombs: 10},
  2: { rows: 16, bombs: 40 },
  3: { rows: 24, bombs: 100 }
}

class App extends Component {
  state = {
      setting: 1
  }

  incrementSetting = () => {
    var setting = this.state.setting;
      if (setting === 3) {
        setting = 1;
      }
      else {
        setting++;
      }
      console.log(setting)
      this.setState({ setting })
  }

    render() {
        return (
            <div>
              <div className="settings" onClick={this.incrementSetting}>
                <span className="fa fa-cog 5x"></span>
              </div>
                <Board rows={settings[this.state.setting].rows}
                       bombs={settings[this.state.setting].bombs} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
