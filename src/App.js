
import './App.scss';
import commentsData from './data.json'
import { useEffect, useState } from 'react';

import axios from 'axios'




import ReplyComponent from './components/replies';
import CommentComponent from './components/comments';
import AddCommentComponent from './components/addComment';
import AddReplyComponent from './components/addReplyComonent';
import EditReplyComponent from './components/editReplyComponent';



const DeleteModalComponent = (props) => {
  return (
    <div className='delete-modal-container'>
        <h1 className='modal-headline'>Delete comment</h1>
        <p className='modal-p'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
        <div className='modal-btns-container'>
         <button onClick={() => props.cancelDelete()} className='cancel-delete-btn'>NO, CANCEL</button>
         <button onClick={() => props.acceptDelete()} className='modal-delete-btn'>YES, DELETE</button>
        </div>
    </div>
  )
}




function App() {
  let commentObject 

  const createComment = () => {
    commentObject = {
      id: Math.floor(Math.random() * 1000) + 5,
      content: commentContent,
      createdAt: "today",
      replies: [],
      score: 0,
      user: {
        image: {
          png: "/images/avatars/image-juliusomo.png",
          webp: ""
        },
        username: "juilusomo"
      }
    }
  }

  const [reply, setReply] = useState(null)
  const [commentReply, setCommentReply] = useState(null)
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [showInput, setShowInput] = useState({})
  // States for modal and delete comment =>
  const [deleteModal, setDeleteModal] = useState(false)
  const [grayBackground, setGrayBackground] = useState("none")
  const [wantToDelete, setWantToDelete] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  const [parentComment, setParentComment] = useState(null)

  const [commentContent, setCommentContent] = useState("")
  const [editCommentContent, setEditCommentContent] = useState("")

  const [initialData, setInitialData] = useState([])

  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('data')) || []
  })


  const getData = async() => {
    axios.get("/data/datatwo.json")
    .then(response => {
      console.log("all set")
      setInitialData(response.data.comments)
      console.log(initialData)
    })
  }
 
  
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data))
  },[data])

  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem("data"))
    if (newData !== null){
    setData(newData)
   }
   else {
    getData()
    setData(initialData)
   }
    setLoading(false)
  }, [])

     // Add comment 
     const addMainUserReply = () => {
      createComment()
      //let newArray = testing.comments.concat(commentObject)
      const updateComments = [...data, commentObject]
      setData(updateComments)
      setCommentContent("")
  }

  const addToReplies = (id, index, comment) => {
    createComment()
    // get the element you want to replace
    const testing = data.find(r => r.id === id)
    // push it into the replies array
    testing.replies.push(commentObject)
    // map over state to find element with same id and replace it
    setData(data => data.map((comment) => (comment.id === data.id ? data : comment)))
    setCommentContent("")
    setReply(false)
    setCommentReply(null)
  }
  const acceptDelete = (id) => {
    setWantToDelete(true)
    if (parentComment === null){
      handleDelete(idToDelete)
    }
   else {
    handleDeleteReply(idToDelete, parentComment)
   }
  }

  const cancelDelete = () => {
    setGrayBackground("none")
    setDeleteModal(false)
    setIdToDelete(null)
  }

 // delete main comment
  const handleDelete = (id) => {
    // displaying modal
    setGrayBackground("disabled")
    setDeleteModal(true)
    setIdToDelete(id)
    
    if (wantToDelete === true){
      // if delete btn from modal is clicked =>
      const newArray = data.filter(remove => remove.id !== id)
      console.log(newArray)
      setData(newArray)
      setGrayBackground("none")
      setDeleteModal(false)
      setIdToDelete(null)
      setWantToDelete(false)
    }
    
  }
  // delete reply 
  const handleDeleteReply = (id,  comment) => {
    setParentComment(comment)
    setGrayBackground("disabled")
    setDeleteModal(true)
    setIdToDelete(id)
    if (wantToDelete === true){
    const newArray = comment.replies.filter(remove => remove.id !== id)
    // get the index of the parent comment
    const findIndex = data.findIndex(x => x.id === comment.id)
    // 
    data[findIndex].replies = newArray
    const allData = [...data]
    setData(allData)
    setGrayBackground("none")
    setDeleteModal(false)
    setIdToDelete(null)
    setWantToDelete(false)
    setParentComment()
    }
    
  }


  const submitEditedReply = (comment, index, id) => {
    const testing = comment
    testing.replies[index].content = editCommentContent
    setData(data => data.map((comment) => (comment.id === data.id ? data : comment)))
    setShowInput(showInput => ({}))
    setEdit(edit => (null))
  }
  
  
  const submitEditedComment = (id) => {
    const findId = data.find(comment => comment.id === id)
    findId.content = editCommentContent
    setData(data => data.map((comment) => (comment.id === data.id ? data : comment )))
    setShowInput(showInput => ({}))
    setEdit(edit => (null))
  } 
  
  const handleComment = (event) => {
    setCommentContent(event.target.value)
  }

  const handleEditing = (event) => {
    setEditCommentContent(event.target.value)
  }

   // make reply input appear / disappear when user clicks on reply
   const handleReply = (index) => {
    setReply(reply => reply === index ? null : index)
}
  const handleCommentReply = (index) => {
    setCommentReply(commentReply => commentReply === index ? null : index)
  }
  
  const handleEdit = (id ,index) => {
    // hiding the element we are editing
    setShowInput(prev => ({
      ...prev, 
      [id]: !prev[id]
    }));
    // getting the edit component based on id
    setEdit(edit => edit === id ? null : id)
    console.log(id)
    console.log(index)

  }


  return (
    <section className={grayBackground}>
    <div className="App">
     {deleteModal ? (
      <>
      <DeleteModalComponent
      acceptDelete={() => acceptDelete()}
      cancelDelete={() => cancelDelete()}
      />
      </>
     ) : null}
      {loading ? (<p> loading..</p>) : data.map((comment, index) => {
        return (
          <div>
           {!showInput[comment.id] ? 
          <CommentComponent
            key={comment.id}
            username={comment.user.username}
            content={comment.content}
            createdAt={comment.createdAt}
            image={comment.user.image.png}
            score={comment.score}
            handleReply={() => handleCommentReply(index)}
            handleDelete={() => handleDelete(comment.id)}
            handleEdit={() => handleEdit(comment.id, index)}
          />
            : null}
          {edit === comment.id && (
            <>
            <EditReplyComponent
            currentUser={comment.user.username}
            createdAt={comment.createdAt}
            image={comment.user.image.png}
            content={comment.content}
            score={comment.score}
            submitEditedComment={() => submitEditedComment(comment.id, comment.content)}
            handleEditing={handleEditing}

            />
            </>
          )}
         
          {commentReply === index && (
            <>
            <AddReplyComponent
          handleComment={handleComment}
          addToReplies={() => addToReplies(comment.id, index, comment)}
          commentContent={commentContent}
          image={"/images/avatars/image-juliusomo.png"}
          />
            </>
          )
           
          
        }
       
      
          {comment.replies.length >= 1 ? (
            <>
            {comment.replies.map((replyComment, index) => {
              return (
                <>
                {!showInput[replyComment.id] ?
                <ReplyComponent
                image={replyComment.user.image.png}
                username={replyComment.user.username}
                createdAt={replyComment.createdAt}
                content={replyComment.content}
                score={replyComment.score}
                replyingTo={replyComment.replyingTo}
                handleDelete={() => handleDeleteReply(replyComment.id, comment)}
                handleReply={() => handleReply(index)}
                editComment={() => handleEdit(replyComment.id, index)}
                /> 
                : null }
                {edit === replyComment.id && (
            <>
            <EditReplyComponent
            currentUser={replyComment.user.username}
            createdAt={replyComment.createdAt}
            image={replyComment.user.image.png}
            content={replyComment.content}
            score={replyComment.score}
            submitEditedComment={() => submitEditedReply(comment, index, replyComment.id)}
            handleEditing={handleEditing}

            />
            </>
          )}
                {reply === index && (
                  <AddReplyComponent
                  handleComment={handleComment}
                  addToReplies={() => addToReplies(replyComment)}
                  commentContent={commentContent}
                  image={"../images/avatars/image-juliusomo.png"}
                  />
                )}
                </>
              )
            })}
            </>
          ):(
            ""
          )}
          </div>
        )
        }
      )
}
        <AddCommentComponent
          handleComment={handleComment}
          addMainUserReply={addMainUserReply}
          commentContent={commentContent}
          image={"../images/avatars/image-juliusomo.png"}
          />
    </div>
    </section>
  );
}

export default App;
