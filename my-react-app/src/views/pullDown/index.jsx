import React, { Component } from 'react'
import LoadMore from '../../components/loadmore/index.js'
import './style.scss'
class PullDown extends Component {
    constructor(props){
        document.title="下拉刷新"
        super(props)
        this.state = {
            data: ['k', 'd9']
        }
    }
    componentDidMount(){
        let arr = this.state.data
        for(let i = 0; i < 14; i++) {
            arr.push(i)
        }
        this.setState({data: arr})
    }
    topMethod() {
        setTimeout(() => {
            this.loadmore.onTopLoaded()
        }, 3000);
    }
    render() {
        return (
            <div className="loadmore-wrapper" style={{ overflow: 'scroll', height: document.documentElement.clientHeight}}>
                <LoadMore ref={loadmore => this.loadmore = loadmore} topMethod={this.topMethod.bind(this)} topIcon={<span>icon</span>}>
                    <ul className="ul-container">
                        {this.state.data.map((item, key) => {
                            return <li key={key}>{item}</li>
                        })}
                    </ul>
                </LoadMore>
            </div>
        )
    }
}
export default PullDown;