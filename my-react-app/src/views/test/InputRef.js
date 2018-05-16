import React, { Component } from 'react';
class InputRef extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            value: '',
            defaultValue: ''
        }
    }
    handleClick() {
        if (this.myTextInput !== null) {
            this.myTextInput.focus();
        }
    }
    render() {
        return (
            <div>
                <input type="text" ref={(ref) => this.myTextInput = ref} />
                <input
                    type="button"
                    value="Focus the text input" onClick={this.handleClick}
                />
                <br />
                受控组件value:{this.state.value}
                <input value={this.state.value} onChange={e => { this.setState({ value: e.target.value.toUpperCase() }) }}
                />
                <br />
                非受控组件defaultValue: {this.state.defaultValue}
                <input defaultValue={this.state.defaultValue} onChange={e => { this.setState({ defaultValue: e.target.value.toUpperCase() }) }}
                />
            </div>
        );
    }
}

export default InputRef;
