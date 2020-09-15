import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

export default function EditForm({ setFriends, toggleEdit, friend: editFriend }) {
  const [ friend, setFriend ] = useState(editFriend);
  function updateFriend(e) {
    const { name, value } = e.target;
    setFriend({...friend, [name]: value})
  }

  function submit(e) {
    e.preventDefault();
    axiosWithAuth().put('/api/friends/' +friend.id , friend)
      .then(res => {
        setFriends(res.data)
        toggleEdit()
      })
      .catch(e => {
        console.log(e)
      })
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
      <button>Save</button>
    </form>
  )
}