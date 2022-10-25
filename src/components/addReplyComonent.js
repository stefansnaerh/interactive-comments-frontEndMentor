import React from "react";


const AddReplyComponent = (props) => {

    return (
    <div className='add-comment-container'>
      <textarea onChange={props.handleComment} placeholder='Add a comment' value={props.commentContent} className='comment-input'></textarea>
      <img alt='your profile' className='current-user-img' src={props.image}/>
      <button onClick={props.addToReplies} type='submit' className='send-button'>REPLY</button>
    </div>
  )
}
 export default AddReplyComponent