import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';

class App extends Component {
    render() {
        return (
            <div>
                <Board rows={8} bombs={10} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
