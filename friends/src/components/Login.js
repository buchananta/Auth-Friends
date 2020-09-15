import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom'

const initialState = {
  username: '',
  password: '',
}
export default function Login() {
  const [ credentials, setCredentials ] = useState(initialState)
  const [ error, setError ] = useState('');
  const history = useHistory()
  
  function updateCreds(e) {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value});
    if (error.length)
      setError('');
  }
  
  function submit(e) {
    e.preventDefault();
    axiosWithAuth().post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push('/friendslist')
      })
      .catch(e => {
        console.log(e.response.data.error);
        setError(e.response.data.error);
      })
  }

  return(
    <form onSubmit={e => submit(e)}>
      <label>Username:&nbsp;
        <input
          name='username'
          type='text'
          value={credentials.username}
          onChange={e => updateCreds(e)}
        />
      </label>
      <br />
      <label>Password:&nbsp; 
        <input
          name='password'
          type='password'
          value={credentials.password}
          onChange={e => updateCreds(e)}
        />
      </label>
      <br />
      <button>Log In!</button>
      <h2>{error}</h2>
    </form>
  )
}