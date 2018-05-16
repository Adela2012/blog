import React, { Component } from 'react';
class App extends Component {
    handleItemChange(item) {
        console.log(item);
    }
    render() {
        return (
            <div className="App">
                <List
                    list={[{ text: 1, checked: true }, { text: 2 }, { text: 3 }]} handleItemChange={this.handleItemChange.bind(this)}
                />
            </div>
        );
    }
}
class List extends Component {
    static defaultProps = {
        list: [],
        handleItemChange: () => { },
    };
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list.map(entry => ({
                text: entry.text,
                checked: entry.checked || false,
            })),
        };
    }
    onItemChange(entry) {
        const { list } = this.state;
        this.setState({
            list: list.map(prevEntry => ({
                text: prevEntry.text,
                checked: prevEntry.text === entry.text ? !prevEntry.checked : prevEntry.checked,
            })),
        });
        this.props.handleItemChange(entry);
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((entry, index) => (
                            <ListItem
                                key={`list-${index}`}
                                value={entry.text}
                                checked={entry.checked} onChange={this.onItemChange.bind(this, entry)}
                            />
                        ))
                    }
                </ul>
            </div>
        );
    }
}
class ListItem extends Component {
    static defaultProps = {
        text: '',
        checked: false,
    }
    render() {
        return (
            <li>
                <input type="checkbox"
                    checked={this.props.checked}
                    onChange={this.props.onChange} />
                <span>{this.props.value}</span>
            </li>);
    }
}
export default App;
