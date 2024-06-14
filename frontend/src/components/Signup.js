import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   useEffect( () => {
      const auth = localStorage.getItem('user');

      if(auth)
         navigate('/');
   })
   
   const collectedData = async () => {
      console.log(name, email, password);

      let result = await fetch('http://localhost:5000/signup', {
         method: 'post',
         body: JSON.stringify({name, email, password}),
         headers: {'Content-Type': 'application/json'}
      })

      result = await result.json();
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result.result));
      localStorage.setItem('token', JSON.stringify(result.auth));

      if(result)
         navigate('/');
   }

   return (
      <div className="signupDetail">
         <h1>SignUp</h1>
         <input type="text" className="signupDetail" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} />
         <input type="text" className="signupDetail" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
         <input type="password" className="signupDetail" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
         <button type="submit" onClick={collectedData}>SignUp</button>
      </div>
   )
}

export default Signup;