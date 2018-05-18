import classnames from 'classnames';
import React from 'react';
import './style.scss';

export default class Flex extends React.Component {
    static defaultProps = {
        prefixCls: 'flex'
    }

    render() {
        const {
            direction,
            wrap,
            justify,
            align,
            alignContent,
            className,
            prefixCls,
            children,
            style,
            ...restProps
        } = this.props

        const wrapCls = classnames(prefixCls, className, {
            [`${prefixCls}-direction-row`]: direction === 'row',
            [`${prefixCls}-direction-row-reverse`]: direction === 'row-reverse',
            [`${prefixCls}-direction-column`]: direction === 'column',
            [`${prefixCls}-direction-column-reverse`]: direction === 'column-reverse',

            [`${prefixCls}-wrap`]: wrap === 'wrap',
            [`${prefixCls}-nowrap`]: wrap === 'nowrap',
            [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

            [`${prefixCls}-justify-content-start`]: justify === 'start',
            [`${prefixCls}-justify-content-end`]: justify === 'end',
            [`${prefixCls}-justify-content-center`]: justify === 'center',
            [`${prefixCls}-justify-content-between`]: justify === 'between',
            [`${prefixCls}-justify-content-around`]: justify === 'around',

            [`${prefixCls}-align-items-start`]: align === 'start',
            [`${prefixCls}-align-items-end`]: align === 'end',
            [`${prefixCls}-align-items-center`]: align === 'center',
            [`${prefixCls}-align-items-stretch`]: align === 'stretch',
            [`${prefixCls}-align-items-baseline`]: align === 'baseline',

            [`${prefixCls}-align-content-start`]: alignContent === 'start',
            [`${prefixCls}-align-content-end`]: alignContent === 'end',
            [`${prefixCls}-align-content-center`]: alignContent === 'center',
            [`${prefixCls}-align-content-between`]: alignContent === 'between',
            [`${prefixCls}-align-content-around`]: alignContent === 'around',
            [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch',

        })


        return (
            <div className={wrapCls} style={style} {...restProps}>
                {children}
            </div>
        )
    }
}
