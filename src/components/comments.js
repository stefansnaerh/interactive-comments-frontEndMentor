import React from "react";
import { useState } from "react";



const CommentComponent = (props) => {

    const [points, setPoints] = useState(props.score)
    
  
    const addPoints = () => {
      setPoints(points + 1)
  }
  
    const subtractPoints = () => {
      setPoints(points - 1)
    } 
  
    return (
      <div className={'comment-container'}>
        <div className="about-user-container">
          <img alt="#" src={props.image} className='profile-pic'></img>
          <h2 className='user-name'>{props.username}</h2>
          <h3 className='time-since-comment'>{props.createdAt}</h3>
        </div>
        <article className='comment'>{props.content}</article>
        <div className='points-container'>
          <button onClick={() => addPoints()} className='plus-button'><img alt='plus' src='/images/icon-plus.svg'/></button>
          <p className='points'>{points}</p>
          <button onClick={() => subtractPoints()} className='minus-button'><img alt='minus'src='/images/icon-minus.svg'/></button>
        </div>
        {props.username === "juilusomo" ?
        <>
         <button onClick={() => props.handleDelete()} className="delete-button"><img alt='delete' className='delete-icon' src='/images/icon-delete.svg'/>Delete</button>
        <button  onClick={() => props.handleEdit()} className='reply-button'><img alt='reply' className='reply-icon' src='/images/icon-edit.svg'/>Edit</button>
        </>
        : <>
        <button onClick={() => props.handleReply()} className='reply-button'><img alt='reply' className='reply-icon' src='/images/icon-reply.svg'/>Reply</button>
        </>}
        
      </div>
    )
  }


  export default CommentComponent