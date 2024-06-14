import React, {useState} from 'react';

const AddProduct = () => {
   const [name, setName] = useState("");
   const [company, setCompany] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("");
   const [error, setError] = useState(false);

   const addProduct = async () => {
      if (!name || !company || !price || !category)
      {
         setError(true);
         return false;
      }
      else
      {
         const userId = JSON.parse(localStorage.getItem('user'))._id;

         let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify( {name, company, price, category, userId} ),
            headers: { 'Content-Type': 'application/json', authorization:`bearer ${ JSON.parse(localStorage.getItem('token')) }` }
         })

         result = await result.json();
         console.log(result);
      }
   }

   return (
      <div className='add-product'>
         <h1>Add Product</h1>

         <input type='text' className='add-product' placeholder='Enter Product Name' value={name} onChange={ (e)=> {setName(e.target.value)} }></input>
         { error && !name && <span className='invalid-input'>Enter valid name</span> }

         <input type='text' className='add-product' placeholder='Enter Product Company' value={company} onChange={ (e)=> {setCompany(e.target.value)} }></input>
         { error && !company && <span className='invalid-input'>Enter valid company</span> }

         <input type='text' className='add-product' placeholder='Enter Product Price' value={price} onChange={ (e)=> {setPrice(e.target.value)} }></input>
         { error && !price && <span className='invalid-input'>Enter valid price</span> }

         <input type='text' className='add-product' placeholder='Enter Product Category' value={category} onChange={ (e)=> {setCategory(e.target.value)} }></input>
         { error && !category && <span className='invalid-input'>Enter valid category</span> }

         <button type='submit' onClick={addProduct}>Add Product</button>
      </div>
   )
}

export default AddProduct;