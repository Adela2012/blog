import classnames from 'classnames'
import React from 'react'

export default class Carousel extends React.Component {
    static defaultProps = {
        prefixCls: 'carousel',
        dots: true,
        arrows: false,
        autoplay: false,
        infinite: false,
        cellAlign: 'center',
        selectedIndex: 0,
        dotStyle: {},
        dotActiveStyle: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex
        }
    }

    render () {
        const {
            infinite,
            selectedIndex,
            beforeChange,
            afterChange,
            dots,
            ...restProps
        } = this.props

        const {
            prefixCls,
            dotActiveStyle,
            dotStyle,
            className,
            vertical
        } = this.restProps

        const newProps = {
            ...restProps,
            wrapAround: infinite,
            slideIndex: selectedIndex,
            beforeSlide: beforeChange
        }

        let Decorators = []

        return (
            <div></div>
        )


    }
}