import classnames from 'classnames';
import React from 'React';

export default class FlexItem extends React.Component {
    static defaultProps = {
        prefixCls: 'flex'
    }

    render() {
        const {children, className, prefixCls, style, ...restProps } = this.props;
        const wrapCls = classnames(`${prefixCls}-item`, className);
        return (
            <div className={wrapCls} style={style} {...restProps}>{children}</div>
        )
    }
}