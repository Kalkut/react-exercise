import React, {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import Comment from '../components/Comment.js';
import * as actions from '../actions/AsyncActions.js'
import styles from '../../css/commentList.css';

// Map data and dispach to the component properties
const mapStateToProps = (state) => {
  return {
    comments: state.Sample.comments,
    fetching: state.Sample.fetching,
    success: state.Sample.success,
    failure: state.Sample.failure
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDataFetched : (comments) => {
      dispatch(actions.loadComments(comments));
    },
    onDataFailure : () => {
      dispatch(actions.failedFetching())
    },
    startFetching : () => {
      dispatch(actions.fetching());
    }
  }
}

// Properties returned by mapStateTopros/mapDispatchToPros are accessible
let CommentList = ({comments, fetching, success, failure, onDataFetched, startFetching, onDataFailure }) => {

  // Request handling
  if(!fetching && !success && !failure){
    startFetching();
    
    request
      .get('/comments')
      .end(function (err, res){
        if(err) {
          onDataFailure();
          return err; // It's going to happen if you don't have mongo : no log
        }
        onDataFetched(res.body);
      })
  }

  // Template
  return (
      <div className={styles.comments}>
        { 
          comments
            .map( (o, i) =>
              <Comment
                key={i}
                username={o.username}
                creationDate={o.creationDate}
                email={o.email}
                content={o.content}
              ></Comment>
            )
            .reverse()
        }
      </div>
  )
}

// Connexion
CommentList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);

export default CommentList;

