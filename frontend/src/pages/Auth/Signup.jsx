import { useState, useEffect } from "react"
import {Link , useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/features/auth/authSlice"
import {toast} from 'react-toastify'
import { useSignupMutation } from "../../redux/api/usersApiSlice"
import '../Auth/form.css'

const Signup=()=>{
    
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Signup] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await Signup({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

    return(
        <section className="form-container">
      <div>
        <h1>Register</h1>

        <form onSubmit={submitHandler} className="container">
          <div className="input-wrapper">
            <label htmlFor="name">Name</label><br/>
              <input type="text" value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email Address</label><br/>
              <input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">
              Password
            </label><br/>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label
              htmlFor="confirmPassword">
              Confirm Password
            </label><br/>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">SignUp </button>
          </form>
          <div className="text">
          <p>Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login </Link>
          </p>
        </div>
      </div>
      </section>
  );
};
    

export default Signup;