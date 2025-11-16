/* 
  authServices.js

  This module manages all authentication-related API calls.
  It uses Axios to communicate with the backend at "http://localhost:3000/api".

  Functions:
    • registerUser(data) → Sends a POST request to create a new user account.
    • loginUser(data)    → Sends a POST request to log in an existing user.

  Both functions send user credentials (like email and password) 
  to the backend and return the server’s response, which usually 
  includes user details and an authentication token.
*/

import axios from 'axios'

const SERVER_URL = "http://localhost:3000/api";

const registerUser = (data)=>{
    return axios.post(SERVER_URL+'/register',data)
}

const loginUser = (data) =>{
    return axios.post(SERVER_URL+'/login',data)
}

const   authServices = {
    registerUser,
    loginUser
}

export default authServices