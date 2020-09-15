import React, { useState } from 'react';

import axiosWithAuth from '../utils/axiosWithAuth';
import EditForm from './EditForm';

export default function Friend({ setFriends, setError, friend }) {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  
  const deleteFriend = () => {
    axiosWithAuth().delete(`/api/friends/${friend.id}`)
      .then(res => {
        console.log(res.data);
        setFriends(res.data);
      })
  }
  if (edit) {
    return (
      <div className='friend' key={friend.id} > 
        <EditForm friend={friend} setFriends={setFriends} toggleEdit={toggleEdit} />  
      </div>
    )
  }
  return (
    <div className='friend' key={friend.id} > 
      <h3>{friend.name}</h3>
      <h4>{friend.email}</h4>
      <p>Age: {friend.age} years</p>
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={deleteFriend}>Delete</button>
    </div>
  )

}