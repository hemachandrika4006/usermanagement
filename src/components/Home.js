import React from 'react'
import {useNavigate} from 'react-router-dom'
function Home() {
  let navigate=useNavigate()
  let gototech=()=>{
    navigate("/aboutus")
  }
  return (
  <div>
 <p className='fs-3 text-center'>Home</p>
    <button onClick={gototech} className='btn btn-primary'> Know more</button>
  </div>
   
  )
}

export default Home