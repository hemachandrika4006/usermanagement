import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
function Rootlayout() {
  return (
    <div>
      
      <Navbar/>
      
      
        {/* placeholder for dynamic content*/}
        <div style={{minHeight:"85vh"}}>
        <Outlet/>
        </div>
     <Footer/>
    </div>
  )
}

export default Rootlayout