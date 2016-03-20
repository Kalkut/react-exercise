import {COMMENT_SUBMITED} from '../constants/ActionTypes';


export function submitComment({username, email, content, creationDate}) {
    return {
        type: COMMENT_SUBMITED,
        username,
        email,
        content,
        creationDate
    }
}