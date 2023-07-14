import React,{ useState,useContext,useEffect } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { loginContext } from "../contexts/logincontext";
function Signin() {
   {/* as we click submit it gives user credentials to context that is handleSubmitUser = (userCredObj) takes
      the values as sends usercredobg as function to       loginUser(userCredObj) as it is the function in userlofinstore it makes api request to backend 
    */}
    let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  
 
    //error state
    let [error, setError] = useState("");
  
    //navigate
    const navigate = useNavigate();
  
    //use form hook
    let {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    //adding new user
    let handleSubmitUser = (userCredObj) => {
      
        loginUser(userCredObj)
     
    };
  
  
   useEffect(()=>{
      if(userLoginStatus===true){
        navigate("/user-profile")
      }
    },[userLoginStatus])
  
    return (
      <div className="add-user">
       
        {/* form submission error */}
        {loginErr?.length !== 0 && (
          <p className="display-3 text-danger text-center">{loginErr}</p>
        )}
        {/* add user form */}
        <div className="row">
          <div className="col-11 col-sm-8 col-md-6 mx-auto">
            <form onSubmit={handleSubmit(handleSubmitUser)}>
              {/* username */}
              <div className="mb-3 mt-5">
                <label htmlFor="name">Userame</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  {...register("username", { required: true })}
                />
                {/* validation errors for name */}
                {errors.username?.type === "required" && (
                  <p className="text-danger fw-bold fs-5">
                    * Username is required
                  </p>
                )}
              </div>
              {/* password */}
              <div className="mb-3">
                <label htmlFor="name">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  {...register("password", { required: true })}
                />
                {/* validation errors for name */}
                {errors.password?.type === "required" && (
                  <p className="text-danger fw-bold fs-5">
                    * Password is required
                  </p>
                )}
              </div>
             
             
              {/* submit button */}
              <button type="submit" className="btn btn-danger">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )}
export default Signin