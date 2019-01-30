import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import Search from './components/search'


class App extends Component {

    constructor() {
        super();

        this.state = {
            players: new Array(11).fill(null),
            currentPlayer: null
        }
    }

    onPlayerSelected(data) {

        let playersCopy = this.state.players.slice(0);
        playersCopy[this.state.currentPlayer] = data;

        this.setState({
            players : playersCopy,
            currentPlayer : null
        });
    }

    render() {

        let list = [];

        for (let i = 0; i < this.state.players.length; i++) {

            list.push(
                <button className={"Player"} onClick={() => this.setState({currentPlayer: i})}>
                    {this.state.players[i] && <span>{this.state.players[i].player_name}</span>}
                </button>
            );
        }

        return (
            <div className="App">
                <main>
                    <div className={"Field"}>
                        {list}
                    </div>
                    {this.state.currentPlayer !== null && <Search onPlayerSelected={(data) => this.onPlayerSelected(data)}/>}
                </main>
            </div>
        );
    }
}

export default App;
