import { useState } from "react";
import {AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd, AiFillCaretDown} from 'react-icons/ai'
import { Link } from "react-router-dom";
import './Navbar.css';
import { useSelector,useDispatch } from "react-redux";
import {useLogoutMutation} from '../../redux/api/usersApiSlice'
import {logout} from '../../redux/features/auth/authSlice'

import { useNavigate } from "react-router-dom";
 

const Navbar = ()=>{
    const {userInfo} = useSelector(state => state.auth)
    

    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async ()=>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");

        }catch(error){
            console.error(error)
        }
    }

    return(
        <>
        
        
        <nav className="navPane">
            
            <ul>
            <Link to = "/"
            className="home-nav"
            >
            <AiOutlineHome className="nav-icon" size={20}/>
            </Link>
            
            <div className="nav-uname">
            {userInfo ? (<span>{userInfo.username} <AiFillCaretDown/></span>) : (<></>)}
            
            <div className="new-list">
             <li>
              <Link to="/profile" className="nav-profile list-item">
                Profile
              </Link>
            </li>
            {/* <li>
              <button
                onClick={logoutHandler}
                className="logout-nav"
              >
                Logout
              </button>
            </li> */}
            {userInfo && userInfo.isAdmin && (
              <>
                
                <li>
                  <Link
                    to="/admin/userlist"
                    className="all-users list-item"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={logoutHandler}
                className="logout-nav list-item"
              >
                Logout
              </button>
            </li>
            
       
            </div>
            </div>

            

            {!userInfo && (
                <>
                <li>
                <Link to = "/login"
                className="login-nav"
                >
                <AiOutlineLogin className="nav-icon" size={18}/>
                <span>Login</span>
                </Link>
                    </li>
                    <li>
                    <Link to = "/Signup"
                className="signup-nav"
                >
                <AiOutlineUserAdd className="nav-icon" size={18}/>
                <span>SignUp</span>
                </Link>
                    </li>
                    </>
            )}

            {/* If admin then  */}
            
            
       
            </ul>
            
        </nav>
        </>
    )
}


export default Navbar;

