import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TabNav from './TabNav'
import TabPane from './TabPane'
class Tabs extends Component {
    static propTypes = {
        // 在主节点上增加可选class
        className: PropTypes.string,
        // class前缀
        classPrefix: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        // 默认激活索引， 组件内更新
        defaultActiveIndex: PropTypes.number,
        // 默认激活索引，组件外更新
        activeIndex: PropTypes.number,
        // 切换时回调函数
        onChange: PropTypes.func
    }
    static defaultProps = {
        classPrefix: 'tabs',
        onChange: () => {}
    }
    constructor(props) {
        super(props)
        this.handleTabClick = this.handleTabClick.bind(this)
        const currProps = this.props

        let activeIndex
        if('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex
        }
    }

    componentWillReceiveProps (nextProps) {
        if('activeIndex' in nextProps) {
            // 如果 props 传入 activeIndex, 则直接更新
            this.setState({
                activeIndex: nextProps.activeIndex
            })
        }
    }

    handleTabClick (activeIndex) {
        const prevIndex = this.state.activeIndex
        if(this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex
            })
            this.props.onChange({activeIndex, prevIndex})
        }
    }
    renderTabNav() {
        const {classPrefix, children} = this.props
        return (
            <TabNav 
                key="tabBar"
                classPrefix = {classPrefix}
                onTabClick = {this.handleTabClick}
                panels = {children}
                activeIndex = {this.state.activeIndex}
            />
        )
    }
    renderTabContent() {
        const { classPrefix, children } = this.props
        return (
            <TabPane 
                key="tabcontent"
                classPrefix = {classPrefix}
                panels = {children}
                activeIndex = {this.state.activeIndex}
            />
        )
    }
    render() {
        const { className } = this.props
        // classnames 用来合并 class
        const classes = classnames(className, 'ui-tabs')
        return (
            <div className={classes}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        )
    }
}
export default Tabs