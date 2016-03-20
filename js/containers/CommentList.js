import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import Comment from '../components/Comment.js';
import * as actions from '../actions/AsyncActions.js'
import styles from '../../css/commentList.css';

const mapStateToProps = (state) => {
  return {
    comments: state.Sample.comments,
    fetching: state.Sample.fetching,
    success: state.Sample.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDataFetched : (comments) => {
      dispatch(actions.loadComments(comments));
    },
    startFetching : () => {
      dispatch(actions.fetching());
    }
  }
}

let CommentList = ({comments, fetching, success, onDataFetched, startFetching }) => {

  if(!fetching && !success){
    startFetching();
    
    request
      .get('/comments')
      .end(function (err, res){
        if(err) return console.error(err);
        onDataFetched(res.body);
      })
  }

  return (
      <div className={styles.comments}>
        { 
          comments.map( (o, i) =>
            <Comment
              key={i}
              username={o.username}
              creationDate={o.creationDate}
              email={o.email}
              content={o.content}
            ></Comment>
          )
        }
      </div>
  )
}

CommentList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);

export default CommentList;

