import {createContext} from 'react';

export const loginContext=createContext({})

//step-1 of context api from userlogin store we created context that is calling creating context from the api clent casn get object sending {}
// step-2 create context provider in userlogin store 
//step-3 apply provider to parent or root component that is outlet in rootlayout
//step-4 getting it to children importing it in
// as weare using the thing we get from backend and taking it as store giving it to login
// as navigation also needs the userloginstore to nknow user is login or not we should provide to index .js removing fro outlet 
