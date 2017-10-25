import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';

class App extends Component {
    render() {
        return (
            <div>
                { 'Minesweeper' }
                <Board rows={4} bombs={1} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
