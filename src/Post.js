import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username,caption,imageUrl}) {
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
        </div>
    )
}

export default Post
    