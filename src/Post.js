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
          .orderBy("timestamp",'desc')
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
        db.collection("posts").doc(postId).collection(comments).add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComments('');
    }
    return (
        <div className="post">
            <div className="postHeader">
                <Avatar 
                className="postAvatar"
                alt="lukekim118"
                src="/static/images/avatar/1.jpg"
                />
                 <h3>{username}</h3>
            </div> 
            <img className="postImage" src={imageUrl}></img>
            <h4 className="postText"><strong>{username} </strong>{caption}</h4>
            <div className="postComments">
                {comments.map((comment)=>(
                    <p>
                         <b>{comment.username}</b> {comment.text}
                    </p>
                ))}
            </div>

            <form>
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
    )
}

export default Post
    