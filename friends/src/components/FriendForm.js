import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const initFriend = {
  name: '',
  age: '',
  email: '',
}

export default function FriendForm({ setFriends, setError }) {
  const [ friend, setFriend ] = useState(initFriend);

  function updateFriend(e) {
    const { name, value } = e.target;
    setFriend({...friend, [name]: value})
  }

  function submit(e) {
    e.preventDefault();
    axiosWithAuth().post('/api/friends', friend)
      .then(res => {
        setFriends(res.data)
      })
      .catch(e => {
        console.log(e.response)
        setError(e.response.status)
      })
    setFriend(initFriend);
  }

  return (
    <form onSubmit={e => submit(e)} >
      <h3>Add a friend!</h3>
      <label>Name:&nbsp;
        <input
          type='text'
          name='name'
          value={friend.name}
          onChange={e => updateFriend(e)}
        />
      </label>
      <br />
      <label>Email:&nbsp;
        <input
          type='email'
          name='email'
          value={friend.email}
          onChange={e => updateFriend(e)}
        />
      </label>
      <br />
      <label>Age:&nbsp;
        <input
          type='number'
          name='age'
          value={friend.age}
          onChange={e => updateFriend(e)}
        />
      </label>
      <br />
      <button>Add</button>
    </form>
  )
}