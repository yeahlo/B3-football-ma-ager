import React, {Component} from 'react';
import '../search.scss';

class Search extends Component {

    constructor() {
        super();
        this.idTimer = -1;

        this.state = {
            playerList: []
        }
    }

    load(search) {
        let key = "eb7490e0ca3a3d75eab567df34d6b3bce6f747b8b30c8bdeee27f52a1ed3b150";
        let url = "https://allsportsapi.com/api/football/?&met=Players&playerName=" + search + "&APIkey=" + key;
        return fetch(url).then(rawData => {
            return rawData.json();
        });
    }

    componentDidMount() {
    }

    onChange(e) {
        clearTimeout(this.idTimer);
        let s = e.currentTarget.value;
        if (s.length > 3) {
            this.idTimer = setTimeout(() => {
                this.load(s).then(value => this.updateList(value));
            }, 750);
        }else {
            this.idTimer = setTimeout(() => {
                this.updateList();
            }, 750);
        }
    }

    updateList(data) {
        let list = [];
        if(data) {
            for (let i = 0; i < Math.min(4,data.result.length); i++) {
                list.push(<button onClick={() => this.props.onPlayerSelected(data.result[i])}>{data.result[i].player_name}</button>);
            }
        }

        this.setState({
            playerList: list
        });
    }


    render() {
        return (
            <div className="Search">
                <label>Selectionnez votre joueur</label>
                <input type={"text"} onChange={(e) => this.onChange(e)}/>
                <div className={"Search_container"}>
                    {this.state.playerList}
                </div>
            </div>
        );
    }
}

export default Search;
