import React from 'react';
import './style.scss'; 
import classnames from 'classnames';
import Notification from 'rmc-notification';

let messageInstance
const prefixCls = 'am-toast'

function getMessageInstance(mask, callback) {
    if (messageInstance) {
        messageInstance.destroy()
        messageInstance = null
    }
    Notification.newInstance({
        prefixCls,
        style: {},
        transitionName: 'am-fade',
        className: classnames({
            [`${prefixCls}-mask`]: mask,
            [`${prefixCls}-nomask`]: !mask
        })
    },
        notification => callback && callback(notification)
    )

}

function notice(content, duration = 0, onClose, mask = true) {
    const iconTypes = {
        info: '',
        success: 'success',
        fail: 'fail',
        offline: 'dislike',
        loading: 'loading'
    }

    getMessageInstance(mask, notification => {
        messageInstance = notification
        notification.notice({
            duration,
            style: {},
            content: !!iconTypes ? (<div className={`${prefixCls}-text`}><div>{content}</div></div>) : (<div className={`${prefixCls}-text`}><div>{content}</div></div>),
            cloasble: true,
            onClose() {
                if (onClose) {
                    onClose()
                }
                notification.destroy()
                notification = null
                messageInstance = null
            }
        })
    })



}
export default notice;