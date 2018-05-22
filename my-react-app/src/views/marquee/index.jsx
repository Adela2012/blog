import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './style.scss';
class Marquee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curTranslateY: 0,
            height: 0,
            length: 0,
            curIndex: 0,
            noAnimate: false
        }
    }
    static defaultProps = {
        interval: 2000,
        duration: 300,
        itemHeight: 22
    }
    componentDidMount() {
        this.initData()
        this.start()
    }

    destroy () {
        this.timer && clearInterval(this.timer)
    }
    
    async initData() {
        this.destroy()

        if(this.cloneNode) {
            this.box.removeChild(this.cloneNode)
        }

        this.cloneNode = null
        let firstItem = this.box.firstElementChild
        if (!firstItem) {
            return false
        }
        await this.setState({
            height: this.props.itemHeight || firstItem.offsetHeight,
            length: this.box.children.length
        })
        this.cloneNode = firstItem.cloneNode(true)
        this.box.appendChild(this.cloneNode)

        return true
    }

    start() {
        this.timer = setInterval(async () => {
            let { height, length, curIndex } = this.state
            let index = curIndex + 1
            let y = -index * height
            await this.setState({ curIndex: index, curTranslateY: y})           
            if(curIndex === length -1) {
                setTimeout(() => {
                    this.go()
                }, this.props.duration)
            } else {
                await this.setState({ noAnimate: false })             
            }
        }, this.props.interval + this.props.duration)
    }

    async go () {
        await this.setState({noAnimate: true}) 
        await this.setState({ curIndex: 0, curTranslateY: 0 })                    
    }

    render() {
        const { children, duration} = this.props
        const { height, curTranslateY, noAnimate} = this.state
        return (
            <div className="marquee-container" style={{ height: height + 'px' }}>
                <ul ref={ ul => this.box = ul} style={{transform: `translate3d(0, ${curTranslateY}px, 0`,transition: `transform ${noAnimate?0:duration}ms`}}>
                    {children}
                </ul>
            </div>
        )
    }
}
class MApp extends Component{
    constructor(props){
        super(props)
        this.state={
            num:0,
            color: 'blue'
        }
    }
    componentDidMount(){
        this.init()
    }
    async init() {
        // this.setState({
        //     num: this.state.num+1
        // }, () => {
        //     console.log('test', this.state.num)
        // })
        await this.setState({ num: this.state.num + 1})
        console.log('test', this.state.num)
    }
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
export default MApp;