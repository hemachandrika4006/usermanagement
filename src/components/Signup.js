
import React,{ useState } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from "react-router-dom"


function Signup() {

  let {
    register,handleSubmit,formState:{errors},
  }=useForm();
  
  
  
  let [error,Seterror]=useState("")
  const navigate=useNavigate();
  
  let adduser=(newuser)=>{
    //console.log(newuser)
    axios.post("http://localhost:5000/user-api/register",newuser)
    .then((response)=>{
      console.log('response is',response) 
    if(response.status===201){
    Seterror("");
  //   navigate("/signin");
  navigate('/login')
    } 
else{
  Seterror(response.data.message)
}
    })
    .catch(err=>{
      console.log('error is',err)
    if(err.response){Seterror(err.message)}  
    else if(err.request){Seterror(err.message)}
    else {Seterror(err.message)}
  })
  }

  return (
    <div>
       {error?.length!== 0 && (
          <p className="display-3 text-danger text-center">{error}</p>
        )}
    <p className='fs-3 text-center'>Register</p>
    <div className="row">
      <div className='col-11 col-sm-6 mx-auto'>
      <form onSubmit={handleSubmit(adduser)}>
      <div className='mb-3'>
          <label htmlFor="username">username</label>
          <input type="text" id="username" className='form-control' {...register("username",{required:true})}/>
          {errors.name?.type==="required" &&<p className='text-danger'>* name is required</p>}
          </div>
             

          <div className='mb-3'>
          <label htmlFor="password">password</label>
          <input type="password" id="password" className='form-control' {...register("password",{required:true})}/>
          {errors.password?.type==="required" &&<p className='text-danger'>* password is required</p>}
          </div>


          <div className='mb-3'>
          <label htmlFor="emailtext">Email</label>
          <input type="email" id="email" className='form-control' {...register("email",{required:true})}/>
          {errors.email?.type==="required" &&<p className='text-danger'>* email is required</p>}
          </div>

          <div className='mb-3'>
          <label htmlFor="dob">DOB</label>
          <input type="date" id="dob" className='form-control' {...register("dob",{required:true})}/>
          {errors.dob?.type==="required" &&<p className='text-danger'>* dob is required</p>}
          </div>

          <div className='mb-3'>
          <label htmlFor="name">Userimage</label>
          <input type="text" id="image" className='form-control' {...register("image",{required:true})}/>
          {errors.name?.type==="required" &&<p className='text-danger'>* image URL is required</p>}
          </div>
       <button type="submit" className='btn btn-success'>Register</button>
    </form>
      </div>
      </div>
      </div>
  )
}

export default Signup;