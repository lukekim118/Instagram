import Post from "./Post";
import React, { useState, useEffect } from "react";
import { db,auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Input, makeStyles } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
// functions differences (3 to 4)
// this.pointer
// bracket uses
// short circuit &
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top:`${top}%`,
    left:`${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme)=>({
  paper:{
    position:'absolute',
    width:400,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid #000`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}))
function App() {
  const [posts, setPosts] = useState([]);
  const [modalStyles] = useState(getModalStyle);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  useEffect(() => {
    db.collection("posts").orderBy("timestamp").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
        if(authUser.displayName){

        } else {
          return authUser.updateProfile({
            displayName:username,
          })
        }
      } else{
        setUser(null)
      }
    })
    return () => {
       unsubscribe();
    }
  },[user,username])
  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=>alert(error.message))
  }
  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>{
      alert(error.message)
    })
    setOpenSignIn(false);
  }
  return (
    <div className="App">
        <Modal open={open} onClose={()=>setOpen(false)} >
              <div style={modalStyles} className={classes.paper}>
                <form className="appSignup">
                  <center>
                  <img
                    alt="instagram logo"
                    src="instagramlogo.png"
                    className="instagramLogo"
                ></img>
                  </center>
                  <Input 
                    placeholder="Username"
                    type="Username"
                    value ={username}
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                  <Input 
                    placeholder="E-Mail"
                    type="email"
                    value ={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <Input 
                    placeholder="Password"
                    type="password"
                    value ={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signUp}>Sign Up</Button>
              </form>
              </div>
        </Modal>
        <Modal open={openSignIn} onClose={()=>setOpenSignIn(false)} >
              <div style={modalStyles} className={classes.paper}>
                <form className="appSignup">
                  <center>
                  <img
                    alt="instagram logo"
                    src="instagramlogo.png"
                    className="instagramLogo"
                ></img>
                  </center>
                  <Input 
                    placeholder="E-Mail"
                    type="email"
                    value ={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <Input 
                    placeholder="Password"
                    type="password"
                    value ={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <Button onClick={signIn}>Sign In</Button>
              </form>
              </div>
        </Modal>
      <div className="appHeader">
        <img
          alt="instagram logo"
          src="instagramlogo.png"
          className="instagramLogo"
        ></img>
        {user ? (<Button onClick={() =>{auth.signOut(true)}}>Logout</Button>):
        (<div className="appLoginContainer">
          <Button onClick={() =>{setOpenSignIn(true)}}>Sign in</Button>
          <Button onClick={() =>{setOpen(true)}}>Sign Up</Button>
        </div>)}
      </div>
      
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
      {user?.displayName ? 
        (<ImageUpload username={user.displayName}/>):(
        <h3>Sorry you need to login to upload</h3>
        )}
    </div>
  )
}

export default App;
