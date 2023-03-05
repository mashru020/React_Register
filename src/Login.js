import { useRef, useState, sueEffect, useEffect, useContext } from 'react'
import {AuthContext} from './context/AuthProvider';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
 console.log(auth);
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user, pwd)
    // setUser('');
    // setPwd('');
    // setSuccess(true);

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='#'>Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              ref={userRef}
              required
              id='username'
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              required
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?<br />
            {/* put router link here */}
            <a href='#'>Sign Up</a>
          </p>
        </section>
      )

      }
    </>

  )
}

export default Login