import React from 'react'
import './style.scss'
const prefixCls = "mint-loadmore"
class LoadMore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topDropped: false,
            translate: 0,
            topStatus: '',
            scrollEventTarget: '',
            startY: 0,
            startScrollTop: 0,
            currentY: 0,
            bottomReached: false

        }
        this.onTopLoaded = this.onTopLoaded.bind(this)
    }
    static defaultProps = {
        maxDistance: 0,
        autoFill: true,
        distanceIndex: 2,
        topPullText: '下拉刷新',
        topDropText: '释放更新',
        topLoadingText: '加载中...',
        topDistance: 70,
        topMethod: function () { console.log('topMethod') },
        translateChange: function (translate) { console.log('translate', translate) },
        topStatusChange: function (topStatus) { console.log('topStatus', topStatus) },
    }
    componentDidMount() {
        this.init()
    }
    onTopLoaded() {
        this.setState({translate: 0})
        setTimeout(() => {
            this.setState({topStatus: 'pull'})
        }, 200);
    }
    async init() {
        await this.setState({
            topStatus: 'pull', 
            scrollEventTarget: this.getScrollEventTarget(this.$el)
        })
        if(typeof this.props.topMethod === 'function') {
            this.bindTouchEvents()
        }
    }
    getScrollEventTarget(element) {
        let currentNode = element 
        while (currentNode && currentNode.tagName !== 'HTML' &&
          currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
            let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
            if (overflowY === 'scroll' || overflowY === 'auto') {
                return currentNode
            } 
            currentNode = currentNode.parentNode
        }
        return window
    }
    getScrollTop(element) {
        if(element === window) {
            return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
        } else {
            return element.scrollTop
        }
    }

    checkBottomReached() {
        if(this.state.scrollEventTarget === window) {
            return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
        } else {
            return this.$el.getBoundingClientRect().bottom <= this.state.scrollEventTarget.getBoundingClientRect().bottom + 1
        }
    }

    bindTouchEvents() {
        this.$el.addEventListener('touchstart', this.handleTouchStart.bind(this))
        this.$el.addEventListener('touchmove', this.handleTouchMove.bind(this))
        this.$el.addEventListener('touchend', this.handleTouchEnd.bind(this))
    }

    handleTouchStart(event){
        this.setState({
            startY: event.touches[0].clientY,
            startScrollTop: this.getScrollTop(this.state.scrollEventTarget),
            bottomReached: false
        })
        if (this.state.topStatus !== 'loading') {
            this.setState({
                topStatus: 'pull',
                topDropped: false
            })
        }
    }
    async handleTouchMove(event){
        if(this.state.startY < this.$el.getBoundingClientRect().top && this.state.startY > this.$el.getBoundingClientRect().bottom){
            return
        }
        await this.setState({currentY: event.touches[0].clientY})
        let distance = (this.state.currentY - this.state.startY) / this.props.distanceIndex
        await this.setState({direction: distance > 0 ? 'down' : 'up'})
        if (typeof this.props.topMethod === 'function' && this.state.direction === 'down' 
            && this.getScrollTop(this.state.scrollEventTarget) === 0 && this.state.topStatus !== 'loading') {
            event.preventDefault()
            event.stopPropagation()
            if (this.props.maxDistance > 0) {
                this.setState({
                    translate: distance <= this.props.maxDistance ? distance - this.state.startScrollTop : this.state.translate
                })
            } else {
                this.setState({
                    translate:  distance - this.state.startScrollTop
                })
            }
            if (this.state.translate < 0) {
                this.setState({translate: 0})
            }
            this.setState({ topStatus: this.state.translate >= this.props.topDistance ? 'drop':'pull'})
        }

        if(this.state.direction === 'up') {
            this.setState({bottomReached: this.state.bottomReached || this.checkBottomReached()})
        }
        this.props.translateChange(this.state.translate)
    }
    handleTouchEnd(){
        if (this.state.direction === 'down' && this.getScrollTop(this.state.scrollEventTarget) === 0 && this.state.translate > 0) {
            this.setState({topDropped: true})
            if (this.state.topStatus === 'drop') {
                this.setState({translate: 50, topStatus: 'loading'})
                this.props.topMethod()
            } else {
                this.setState({translate: 0, topStatus: 'pull'})
            }
        }
        this.setState({direction: ''})
        this.props.translateChange(this.state.translate)
    }

    getTopText(topStatus) {
        this.props.topStatusChange(topStatus)
        switch (topStatus) {
            case 'pull':
                return this.props.topPullText
            case 'drop':
                return this.props.topDropText
            case 'loading':
                return this.props.topLoadingText
        }
    }

    render() {
        const { topDropped, translate, topStatus } = this.state
        return (
            <div className={`${prefixCls}`} ref={el => this.$el = el}>
                <div
                    className={`${prefixCls}-content ${topDropped ? 'is-dropped' : ''}`}
                    style={{ 'transform': `translate3d(0, ${translate}px, 0)` }}>
                    <div className={`${prefixCls}-top`}>
                        {
                            topStatus === 'loading' 
                                ? <span className={`${prefixCls}-spinner`}>icon</span>
                                : ''
                        }
                        <span className={`${prefixCls}-text`}>{this.getTopText(topStatus)}</span>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default LoadMore