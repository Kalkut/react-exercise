import request from 'superagent';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState = { // Comments for the data, the rest for the async
  comments: localStorage.comments ? JSON.parse(localStorage.comments) : [],
  fetching: false,
  success: false,
  failure: false
};


// Did not have time to split my reducers.
export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.COMMENT_SUBMITED:
        // Our new comment obviously
        const newComment = {
            username: action.username,
            email: action.email,
            content: action.content,
            creationDate: action.creationDate
        }
        
        //localStorage is still active
        localStorage.comments = JSON.stringify([...state.comments, newComment ]);
        
        // It could have been done in the component
        // Code coupling could have been avoided with some middleware (thunk)
        request
            .post('/comments')
            .set('Content-Type', 'application/json')
            .send(newComment)
            .end(function (err, res) {
                if(err) return err;
                // No handling of the POST failure
                // This POST don't actualy change the state of the app
                // No multiple post handling. You'd have to be quite fast
                // to submit 2 form at the same time
            })
        
        return {
            ...state,
            comments: [...state.comments, newComment ]
        }
    case ActionTypes.DATA_FETCHED: // Fetching succeeded
        localStorage.comments = JSON.stringify(action.comments)
        return {
            ...state,
            comments: action.comments,
            fetching: false,
            success: true
        }
    case ActionTypes.DATA_FETCHING: // Fetching pending
        return {
            ...state,
            fetching: true,
            success: false,
            failure: false
        }
    case ActionTypes.DATA_FAILURE: // Fetching failed : Most likely you don't have MongoDB
        return {
            ...state,
            failure: true
        }
    default:
      return state;
  }
}
