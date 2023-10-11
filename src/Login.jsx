import { useState, useRef } from 'react'
import { MutableRefObject, useLayoutEffect } from 'react'
import axios from 'axios';
import './Login.css'




// let configIsLogged = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'http://localhost:5000/Auth/IsLogged',
//   withCredentials: true
// };


function InputsForm(){
  
  const login = useRef();
  const password = useRef();
  // function Login(evnt){
  //   let log = login.current.value;
  //   let pass = password.current.value;
  //   console.log(log + pass);
  //   let data = JSON.stringify(
  //     {
  //     "email": log,
  //     "password": pass
  //     });

  //   let configLogin = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'http://localhost:5000/Auth/Login',
  //     headers: { 
  //       'Content-Type': 'application/json'
  //     },
  //     data : data,
  //     withCredentials: true
  //   };

  //   axios.request(configLogin)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return;
  //   });
  //   login.current.value = "";
  //   password.current.value = "";
  // }
  return(
    <div class="Inputs">
      
      <input type="text" ref={login}></input>
      <input type="text" ref={password}></input>
      <button>Login</button>
    </div>
  )
}
//onClick={Login}

function LoginForm(){
//   axios.request(configIsLogged)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
//   return ("logged");
// })
// .catch((error) => {
//   console.log(error);
  
// });

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api-shoppin-bd968644c4b5.herokuapp.com/User/GetUsers',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

  return (
    <div class="LoginForm">
      <InputsForm/>
    </div>
  )
}

export default LoginForm