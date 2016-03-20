import {DATA_FETCHED, DATA_FETCHING} from '../constants/ActionTypes';

export function loadComments(comments) {
    return {
        type: DATA_FETCHED,
        comments
    }
}

export function fetching() {
    return {
        type: DATA_FETCHING
    }
}
