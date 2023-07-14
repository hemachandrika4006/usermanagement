import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Rootlayout from './components/Rootlayout';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import Products from './components/Products';
import Cart from './components/Cart';
import About from './components/About';



function App() {

  //router can be any element and  createBrowserRouter function consist of array of routes
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout/>,
      children:[
        {
         path:"/",
         element:<Home/>
        },
       
        {
          path:"/register",
          element:<Signup/>
         },
        {
          path:"/login",
          element:<Signin/>
         },
         {
          path:"/aboutus",
          element:<About/>
         },
         {
          path:"/user-profile",
          element:<UserProfile/>,
           children:[
            {
            path:"products",
            element:<Products/>        
              },
            {
                path:"cart",
                element:<Cart/>        
             },
          
           ]
          
         }
      ]
    }
  ])


  return (
   
                              <div>
<RouterProvider router={router}/>
                              

  </div>
  )};


export default App;