import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/comment.css';

// Turns '9' into '09'
const normaliseFigures = (n) => +n > 9 ? n : '0'+n

// Explicit
const fromTimestampToDay = (ts) => {
    const date = new Date(ts);
    return normaliseFigures(date.getDate()) + '/' + normaliseFigures(date.getMonth())
}

// Explicit
const fromTimestampToTime = (ts) => {
    const date = new Date(ts);
    return normaliseFigures(date.getHours()) + ':' + normaliseFigures(date.getMinutes())
}


// A bit massive
// Could be made up of multiple components
const Comment = ({username,  email, content, creationDate}) => (
    <div className={styles.comment}>
        <div className={styles.body}>
            <div className={styles.email}>
                <div className={styles.mailIcon}>
                    <a href={'mailto:'+email} className="fa fa-envelope-o"></a>
                </div>
                <div className={styles.mailMsg}>
                    <a href={'mailto:'+email}>{'Mail to ' + email}</a>
                </div>
            </div>
            <div className={styles.now}>
                <div className={styles.username}>{username}</div>
                <div className={styles.date}>
                    <div className={styles.day}>{fromTimestampToDay(creationDate)}</div>
                    <div className={styles.time}>{fromTimestampToTime(creationDate)}</div>
                </div>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    </div>
)

export default Comment