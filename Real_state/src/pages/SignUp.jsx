import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

function SignUp() {
   const [formData, setFormData] = useState({});
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   const handlechange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value
      })

   };
   // console.log(formData);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {

         setLoading(true)

         const res = await fetch('http://localhost:4000/Api/auth/sign-up', {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
         });

         const data = await res.json()
         console.log(data)

         if (data.success === false) {
            setError(data.message);
            setLoading(false)
            return;
         }
         setLoading(false)
         setError(null)
         navigate('/sign-in')
      } catch (error) {
         setLoading(false);
         setError(error.message)

      }
   }

   return (
      <>
         <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Sign up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
               <input onChange={handlechange} type="text" placeholder='username' className='border p-3 rounded-lg ' id='username' />
               <input onChange={handlechange} type="text" placeholder='Emai' className='border p-3 rounded-lg ' id='email' />
               <input onChange={handlechange} type="text" placeholder='password' className='border p-3 rounded-lg ' id='password' />
               <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase  hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading...' : 'Sign Up'}</button>

               <OAuth />
            </form>


            <div className='flex gap-2 mt-5'>
               <p>Have an account?</p>
               <Link to={'/sign-in'}>
                  <span className='text-blue-700'>Sign in</span>
               </Link>
            </div>
         </div>
      </>
   )
}

export default SignUp;