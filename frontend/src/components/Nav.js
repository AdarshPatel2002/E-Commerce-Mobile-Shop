import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Nav = () => {
   const navigate = useNavigate();
   const auth = localStorage.getItem('user');

   const logout = () => {
      localStorage.clear();
      navigate('/signup');
   }

   return (
      <div className='nav'>
         { auth ? 
            <ul>
               <li><Link to="/">Products</Link></li>
               <li><Link to="/add">Add Product</Link></li>
               <li><Link to="/update">Update Product</Link></li>
               <li><Link to="/profile">{JSON.parse(auth).name}</Link></li>
               <li className='nav-right'><Link onClick={logout} to="/login">Logout</Link></li>
            </ul> :
            <ul className='nav-right'>
               <li><Link to="/login">Login</Link></li>
               <li><Link to="/signup">Signup</Link></li>
            </ul>
         }
      </div>
   )
}

export default Nav;