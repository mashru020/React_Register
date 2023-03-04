import { useRef, useState, sueEffect, useEffect} from 'react'

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(()=> {
      setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user, pwd)
      setUser('');
      setPwd('');
      setSuccess(true);
    }

  return (
    <>
      {success? (
        <section>
          <h1>You are logged in!</h1>
          <br/>
          <p>
            <a href='#'>Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
      <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          ref={userRef}
          required
          id='username'
          autoComplete='off'
          onChange={(e)=> setUser(e.target.value)}
          value={user}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          required
          id='password'
          onChange={(e)=> setPwd(e.target.value)}
          value={pwd}
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?<br/>
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