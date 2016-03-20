import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../css/app.css';
import Comment from './Comment.js';
import AddComment from '../containers/AddComment.js';
import CommentList from '../containers/CommentList.js';


// Trivial
class Home extends Component {
  render() {
    return (
      <div className={styles.app}>
        <CommentList></CommentList>
        <AddComment></AddComment>
      </div>
    )
  }
}

export default connect(state => state.Sample)(Home)