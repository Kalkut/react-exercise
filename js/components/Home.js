import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../css/app.css';
import Comment from './Comment.js';
import AddComment from '../containers/AddComment.js';
import CommentList from '../containers/CommentList.js';

class Home extends Component {
  render() {

    var berny = [{
      username: 'Rachel',
      creationDate: Date.now(),
      email: 'Rachel@gmail.com',
      content: 'Hello guys ! Glad to meet you <3'
    }, {
      username: 'Bobby',
      creationDate: Date.now(),
      email: 'Bobby@mechanic-plumber.com',
      content: 'Though I was not going to take part to the party eh ?'
    }];

    return (
      <div className={styles.app}>
        <CommentList></CommentList>
        <AddComment></AddComment>
      </div>
    )
  }
}

export default connect(state => state.Sample)(Home)