import React, { useState, useEffect } from 'react';

import FriendForm from './FriendForm';
import axiosWithAuth from '../utils/axiosWithAuth';

export default function FriendsList() {
  const [ friends, setFriends ] = useState();
  const [ error, setError ] = useState();
  
  useEffect(() => {
    axiosWithAuth().get('/api/friends')
      .then(res => {
        console.log(res.data);
        setFriends(res.data);
      })
      .catch(e => {
        console.log(e.response);
        setError(e.response.status);
      })
  }, [])

  return (
    <>
      {error && <h3>ERROR: {error}</h3> }
      <div className='friends-list'>
        {friends
          ? friends.map(friend => {
            return (
              <div className='friend' key={friend.id} > 
                <h3>{friend.name}</h3>
                <h4>{friend.email}</h4>
                <p>Age: {friend.age} years</p>
              </div>
            )
          })
          : !error && <h3>loading...</h3>
        }
      </div>
      <FriendForm setFriends={setFriends} setError={setError} />
    </>
  )
}