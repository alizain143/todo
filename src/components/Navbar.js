import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
   <nav className="nav">
      <Link to="/"><h1  className='heading-nav'>TodoAPP</h1></Link>  
       <ul className='nav-ul'>
       <Link to="/main/inprogress"> <li  className='nav-li'>IN-PROGRESS</li></Link>
       <Link to="/main/done"><li  className='nav-li'>DONE</li></Link>
       <Link to="/main/history"><li  className='nav-li'>HISTORY</li></Link>
        
       </ul>
   </nav>
    </>
  )
}
