import React from "react";
import { signOut, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";

const LogInOut = ({userOnline ,setUserOnline, error, setError}) => {
    const acc = getAuth();
    const emailRef = useRef();
    const passRef = useRef();

    const logOut = async (e) => {
        e.preventDefault();
        if (userOnline == null) {
            return
        } else {
            await  signOut(acc)
            setUserOnline(null);
        }
    }

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(acc, emailRef.current.value, passRef.current.value);
            setUserOnline(user.user.email);
            if (user.user.email) {
                setError(null);
            }
        } catch (err) {
            let message = "Access Denied. The email or password is incorrect"
            setError(message);
        };
        document.querySelectorAll(".input").forEach(
            input => (input.value = ""));
            
    }

    return (
        
        <div className="login-form">
            {error && <div className="error">{error}</div>}
            <form className="login">
                <input className="input input-email" type="email" name="email"
                     placeholder=" " ref={emailRef} required />
                <label className="form-label label-email" >
                    email
                </label>
                <input className="input input-pass" type="password" name="password"
                    placeholder=" " ref={passRef} required />
                <label className="form-label label-pass" >
                    password
                </label>
                {!userOnline && <button className="log-btn" onClick={logIn}>Log In</button>}
                {userOnline && <button className="log-btn" onClick={logOut}>Log Out</button>}
            </form>
        </div>
        
    )
}

export default LogInOut;