import React, { Component } from 'react';
import Toast from '../../components/toast'
class ToastDemo extends Component {
    showToast() {
        Toast('Toast without mask !!!');
    }
    render() {
        return (
            <div className="toast">
                <button onClick={() => this.showToast()}>click me!</button>
            </div>
        );
    }
}
export default ToastDemo;
