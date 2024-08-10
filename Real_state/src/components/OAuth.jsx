import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function OAuth() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleGoogleClick = async () => {

      try {
         const Provider = new GoogleAuthProvider();
         const auth = getAuth(app);

         const result = await signInWithPopup(auth, Provider);

         const res = await fetch('http://localhost:4000/api/auth/google', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: result.user.displayName,
               email: result.user.email,
               photo: result.user.photoURL,
            }),
         });

         const data = await res.json();
         dispatch(signInSuccess(data))
         navigate('/')

      } catch (error) {
         console.log('could not sign in with google', error)

      }
   }
   return (
      <>
         <button onClick={handleGoogleClick} type='button' className='bg-red-600 text-white p-4 rounded-lg  uppercase hover:opacity-95 '>Sign up with Google</button>


      </>

   )
}

export default OAuth
