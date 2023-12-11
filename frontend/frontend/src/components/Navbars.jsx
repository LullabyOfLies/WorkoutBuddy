import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Navbars = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const navigate = useNavigate();
  const handleClick = () =>{
    logout();
  }
  return (
    <header>
    <div className="container">
       <Link to="/">
             
          <h1>Workout Buddy!</h1>

       </Link>
       <nav>
      
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
          <div>
            <Link to="/login">
              Login
            </Link>
            <Link to="/signup">
              Sign Up
            </Link>
          </div>
          )}
       </nav>
    </div>
    </header>
  )
}

export default Navbars