import React from "react";

// þessi bara fyrir top level comment???
const AddCommentComponent = (props) => {
    return (
      <div className='add-comment-container'>
        <textarea onChange={props.handleComment} placeholder='Add a comment' value={props.commentContent} className='comment-input'></textarea>
        <img alt='your profile' className='current-user-img' src={props.image}/>
        <button onClick={props.addMainUserReply} type='submit' className='send-button'>SEND</button>
      </div>
    )
  }
  
  
export default AddCommentComponent  