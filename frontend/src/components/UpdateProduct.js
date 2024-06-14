import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
   const [name, setName] = useState("");
   const [company, setCompany] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("");
   const params = useParams();
   const navigate = useNavigate();

   useEffect( () => {
      getProductDetails();
   }, [])

   const getProductDetails = async () => {

      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
         headers: { authorization: `bearer ${ JSON.parse(localStorage.getItem('token')) }` }
      });

      result = await result.json();
      setName(result.name);
      setCompany(result.company);
      setPrice(result.price);
      setCategory(result.category);
   }

   const updateProduct = async () => {
      console.log(name, company, price, category);

      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
         method: 'put',
         body: JSON.stringify( {name, company, price, category} ),
         headers: { 'Content-Type': 'application/json', authorization:`bearer ${ JSON.parse(localStorage.getItem('token')) }` }
      })

      result = await result.json();
      console.log(result);
      navigate('/');
   }

   return (
      <div className='add-product'>
         <h1>Update Product</h1>
         <input type='text' className='add-product' placeholder='Enter Product Name' value={name} onChange={ (e)=> {setName(e.target.value)} }></input>
         <input type='text' className='add-product' placeholder='Enter Product Company' value={company} onChange={ (e)=> {setCompany(e.target.value)} }></input>
         <input type='text' className='add-product' placeholder='Enter Product Price' value={price} onChange={ (e)=> {setPrice(e.target.value)} }></input>
         <input type='text' className='add-product' placeholder='Enter Product Category' value={category} onChange={ (e)=> {setCategory(e.target.value)} }></input>
         <button type='submit' onClick={updateProduct}>Update Product</button>
      </div>
   )
}

export default UpdateProduct;