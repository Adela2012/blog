import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './style.scss';
class Marquee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curTranslateY: 0,
            height: '',
            length: 0,
            curIndex: 0,
            noAnimate: false
        }
    }
    static defaultProps = {
        interval: 2000,
        duration: 300,
        itemHeight: 30
    }
    componentDidMount() {
        // this.destroy()
        this.init()
        this.start()
    }

    destroy () {
        this.timer && clearInterval(this.timer)
    }

    init () {
        // this.destroy()

        if(this.cloneNode) {
            this.box.removeChild(this.cloneNode)
        }

        this.cloneNode = null
        let firstItem = this.box.firstElementChild
        if (!firstItem) {
            return false
        }
        this.setState({
            length: this.box.children.length, 
            height: this.props.itemHeight || firstItem.offsetHeight
        })

        this.cloneNode = firstItem.cloneNode(true)
        this.box.appendChild(this.cloneNode)

        return true
    }

    start() {
        const { height,length,curIndex} = this.state
        this.timer = setInterval(() =>{
            let index = curIndex + 1
            let y = -curIndex * height
            this.setState({ curIndex: index, curTranslateY: y})
            if(curIndex === length) {
                setTimeout(() => {
                    this.go(true)
                }, this.props.duration)
            } else if (curIndex === -1) {
                setTimeout(() => {
                    this.go(false)
                }, this.props.duration)
            } else {
                this.setState({ noAnimate: false })             
            }
        }, this.props.interval + this.props.duration)
    }

    go (toFirst) {
        // const { curTranslateY, height, length, curIndex, noAnimate } = this.state
        this.setState({noAnimate: true}) 
        if(toFirst) {
            this.setState({ curIndex: 0, curTranslateY: 0 })             
        } else {
            let index = this.state.length - 1
            let y = -this.state.length * this.state.height
            this.setState({ curIndex: index, curTranslateY: y })             
        }      
    }

    render() {
        const { children } = this.props
        return (
            <div className="marquee-container">
                <ul ref={ ul => this.box = ul}>
                    {children}
                </ul>
            </div>
        )
    }
}
class App extends Component{
    render() {
        return (
            <Marquee>
                <li>ddd1</li>
                <li>ddd2</li>
                <li>ddd3</li>
            </Marquee>
        )
    }
}
export default App;