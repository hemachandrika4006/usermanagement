import React, { useState } from "react";
import { loginContext } from "./logincontext";
import axios from "axios";

function UserLoginContext({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loginErr, setLoginErr] = useState(""); // for updating the message whether it is write or wrong 
  const [userLoginStatus,setUserLoginStatus]=useState(false)
   {/*for knowing the status of login if components want to know does user login 
it in or not we have to know the status if it is false no user is logging if it is true some user is logged into it 
to know who is that someone we keep track on user*/} 

  

  //login user
  const loginUser = (userCredObj) => {
    axios
      .post("http://localhost:5000/user-api/login", userCredObj)
      .then((response) => {
        if (response.data.message === "success") {

          console.log(response)
          //save token to local storage
          localStorage.setItem("token",response.data.token)
          setCurrentUser({...response.data.user}); // we are using spreading operator bcz to maintaint he copy of the details of user
          setLoginErr("");
          setUserLoginStatus(true)
        } else {
          setLoginErr(response.data.message);
        }
      })
      .catch((err) => {
        console.log("err",err)
        setLoginErr(err.message);
      });
  };

  //logout user
  const logoutUser=()=>{
    localStorage.clear()// for removing token 
    setUserLoginStatus(false) // for making status from logout to login 
  }

  return (
    <loginContext.Provider value={[currentUser,loginErr,userLoginStatus,loginUser,logoutUser]}>
      {children}
    </loginContext.Provider>
  );
}

export default UserLoginContext;