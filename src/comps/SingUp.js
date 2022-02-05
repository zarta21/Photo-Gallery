import React, { useRef } from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const SingUp = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const acc = getAuth();
    

    const handleSubmit = async (e) => {
        e.preventDefault();        
        const cred = await createUserWithEmailAndPassword(acc, emailRef.current.value, passRef.current.value)
        document.querySelectorAll(".input").forEach(
            input => (input.value = ""));
        
    }



    return (
        <form onSubmit={handleSubmit}>
            <label> email
                <input className="input" type="email" name="email"
                 ref={emailRef} required />
             </label>
            <label>password
                <input className="input" type="password" name="password"
                 ref={passRef} required />
             </label>
            <input type="submit" />
        </form>
    )
}

export default SingUp;