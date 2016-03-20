import request from 'superagent';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
  comments: localStorage.comments ? JSON.parse(localStorage.comments) : [],
  fetching: false,
  success: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.COMMENT_SUBMITED:
        const newComment = {
            username: action.username,
            email: action.email,
            content: action.content,
            creationDate: action.creationDate
        }
        
        localStorage.comments = JSON.stringify([...state.comments, newComment ]);
        
        console.log('post', request);
        request
            .post('/comments')
            .set('Content-Type', 'application/json')
            .send(newComment)
            .end(function (err, res) {
                if(err) console.error(err);
                console.log('posted cleint');
            })
        
        return {
            ...state,
            comments: [...state.comments, newComment ]
        }
    case ActionTypes.DATA_FETCHED:
        localStorage.comments = JSON.stringify(action.comments)
        return {
            ...state,
            comments: action.comments,
            fetching: false,
            success: true
        }
    case ActionTypes.DATA_FETCHING:
        return {
            ...state,
            fetching: true
        }
    default:
      return state;
  }
}
