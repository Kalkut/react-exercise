import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/AddCommentActions'
import styles from '../../css/addcomment.css';

let AddComment = ({ dispatch }) => {
    let username = '', email = '', content = '';
    let userInput, emailInput, contentInput;

    return (
        <div className={styles.menu}>
            <form
                onSubmit={ (e) => {
                    e.preventDefault();
                    let newComment = {
                        creationDate: Date.now(),
                        username: userInput.value,
                        email: emailInput.value,
                        content: contentInput.value
                    }
                    dispatch(actions.submitComment(newComment));
                    userInput.value = emailInput.value = contentInput.value = '';
                }}
            >
                <input
                    required
                    className={styles.input}
                    placeholder="Username"
                    type="text"
                    ref= { node =>
                        userInput = node
                    }/>
                <input
                    className={styles.input}
                    placeholder="Email (optional)"
                    type="email"
                    ref= { node =>
                        emailInput = node
                    }/>
                <textarea
                    required
                    className={styles.txtarea}
                    placeholder="Your comment"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    ref= { node =>
                        contentInput = node
                    }></textarea>
                <input
                    className={styles.submit}
                    type="submit"
                    value="Post your comment"/>
            </form>
        </div>
    )
}

AddComment = connect()(AddComment);

export default AddComment