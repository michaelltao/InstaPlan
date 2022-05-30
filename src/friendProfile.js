import React from 'react'
import { useState, useEffect } from 'react'
import "./searchPage.css"
import { db, auth } from './firebase.js';
import { Modal, Button, Input, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import UserEvents from './userEvents.js';


function FriendProfile({id, user}) {
  const [open, setOpen] = useState(false);

  const onFollow = () => {
    db
    .collection("following")
    .doc(auth.currentUser.uid)
    .collection("userFollowing")
    .doc(id)
    .set({})
  }

  const onUnFollow = () => {
    db
    .collection("following")
    .doc(auth.currentUser.uid)
    .collection("userFollowing")
    .doc(id)
    .delete()
  }



  return (
    <>
    <Button onClick={()=>setOpen(true)}>
    {user}
    </Button>
    <Dialog aria-labelledby='dialog-title' open ={open} onClose = {() => setOpen(false)} PaperProps={{ sx: { width: "100%", height: "80%" } }} >
        <DialogTitle id = 'dialog-title'>{user}</DialogTitle>
        <DialogContent>
              <UserEvents key={id} userID={id} name={user} />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onFollow()}>Follow</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default FriendProfile