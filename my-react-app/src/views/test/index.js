import React, { Component } from 'react';
import CheckList from './CheckList'
import InputRef from './InputRef'
import EventEmitter from './EventEmitter'
// import Context from './Context'
class App extends Component {
    render() {
        return (
            <div className="App">
                <InputRef />
                <br/>
                <CheckList />
                <br />
                {/* <Context /> */}
                <EventEmitter />
            </div>
        );
    }
    componentDidMount(){
        const mixin = function (obj, mixins) {
            const newObj = obj;
            newObj.prototype = Object.create(obj.prototype);
            for (let prop in mixins) {
                if (mixins.hasOwnProperty(prop)) {
                    newObj.prototype[prop] = mixins[prop];
                }
            }
            return newObj;
        }
        const BigMixin = {
            fly: () => {
                console.log('I can fly');
            }
        };
        const Big = function () {
            console.log('new big');
        };
        const FlyBig = mixin(Big, BigMixin);
        const flyBig = new FlyBig(); // => 'new big'
        flyBig.fly(); // => 'I can fly'
    }
}

export default App;
