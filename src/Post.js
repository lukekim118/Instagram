import React,{useState,useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase';
// import firebase from 'firebase';
import firebase from '@firebase/app-compat';

function Post({postId,user,username,caption,imageUrl}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState([]);
    useEffect(()=>{
        let unsubscribe;
        if(postId) {
          unsubscribe=db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy("timestamp")
          .onSnapshot((snapshot)=>{
            setComments(snapshot.docs.map((doc)=>doc.data()));
          });
        }
        return () => {
          unsubscribe();
        };
      },[postId]);
    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className="postHeader">
                <Avatar 
                id="postAvatar"
                className="postAvatar"
                alt="lukekim118"
                src="/static/images/avatar/1.jpg"
                />
                 <h3>{username}</h3>
            </div> 
            <img className="postImage" src={imageUrl}></img>
            <p id="postText" className="postText"><strong>{username} </strong>{caption}</p>
            <div className="postComments">
                {comments.map((comment)=>(
                    <p className="txt">
                         <b className="txt">{comment.username}</b> {comment.text}
                    </p>
                ))}
            </div>
                {user && 
                <div className="addComment">
                    <form className="addComment">
                    <input
                        className="postInput"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e)=>{setComment(e.target.value)}}
                    />
                    <button
                        disabled={!comment}
                        className="postButton"
                        type="submit"
                        onClick={postComment}
                    >Post</button>
                </form>
                </div> 

                }
             
        </div>
    )
}

export default Post
    