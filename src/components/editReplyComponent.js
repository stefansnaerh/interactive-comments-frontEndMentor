import React from "react";

import { useState } from "react";

const EditReplyComponent = (props) => {
    const [points, setPoints] = useState(props.score)
      
    
    const addPoints = () => {
      setPoints(points + 1)
  }
  
    const subtractPoints = () => {
      setPoints(points - 1)
    } 
    return (
      <div className='comment-container'>
        <img alt='#' src={props.image} className="profile-pic"></img>
        <h2 className='user-name'>{props.currentUser}</h2>
        <h3 className='time-since-comment'>{props.createdAt}</h3>
        <textarea className='comment' onChange={props.handleEditing} value={props.editCommentConent}>{props.content}</textarea>
        <div className='points-container'>
            <button onClick={() => addPoints()} className='plus-button'><img alt='plus' src='./images/icon-plus.svg'/></button>
            <p className='points'>{points}</p>
            <button onClick={() => subtractPoints()} className='minus-button'><img alt='minus'src='./images/icon-minus.svg'/></button>
          </div>
          <button onClick={() => props.submitEditedComment()} type='submit' className='update-button'>UPDATE</button>
      </div>
    )
  }

  export default EditReplyComponent