import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import {useLoginMutation} from '../../redux/api/usersApiSlice'
import { setCredentials } from "../../redux/features/auth/authSlice";
import '../Auth/form.css'
//import Loader from "../../components/Loader";
import { toast } from "react-toastify";


const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            
          const res = await login({ email, password }).unwrap();
          
          
          dispatch(setCredentials({ ...res }));
          
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message || err.message);
          
        }
      };
    return <div>
        <section className="form-container">
            <div>
                <h1>Sign in</h1>

                <form className="container" onSubmit={submitHandler}>
                    <div className="input-wrapper">
                    <label htmlFor="email">Email Address</label><br/>
                    <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    </div>

                    <div className="input-wrapper">
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    </div>

                    <button
            //   disabled={isLoading}
              type="submit"
              className="btn"
            >Login
              {/* {isLoading ? "Signing In..." : "Sign In"} */}
            </button>

            {/* {isLoading && <Loader />} */}
          </form>

                <div className="text">
                    <p>
                        New User ? {" "}
                        <Link to = {redirect? `/Signup?redirect=${redirect}`: '/register'}>
                           Create an Account 
                        </Link>
                    </p>
                </div>
            </div>
        </section>
        
        </div>
        
};

export default Login;