import React, { useEffect, useState } from "react";
import Social from './Social';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon, faSun, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

const Header = ({setError}) => {
    let storedDarkMode = localStorage.getItem("DARK_MODE");
    const [darkMode, setDarkMode] = useState(storedDarkMode);    
    
    useEffect(() => {
        if (localStorage.getItem("DARK_MODE") === "on") {
            document.body.classList.add("dark-mode");
            localStorage.setItem("DARK_MODE", "on");
            let label =  document.querySelector(".toggle-label");
            let ball = document.querySelector(".ball");
            label.classList.add("active");
            ball.classList.add("active");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        storedDarkMode = localStorage.getItem("DARK_MODE");
        let label =  document.querySelector(".toggle-label");
        let ball = document.querySelector(".ball");
        if (storedDarkMode !== "on") {
            document.body.classList.add("dark-mode");
            localStorage.setItem("DARK_MODE", "on");
            setDarkMode(storedDarkMode)
            label.classList.add("active");
            ball.classList.add("active");

        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("DARK_MODE", null);
            setDarkMode(storedDarkMode)
            label.classList.remove("active");
            ball.classList.remove("active");
        }
    };

    const ShowLogin = (e) => {
        e.preventDefault();
        let showHideLogin = document.querySelector(".login");
        if (showHideLogin.classList.contains("login-active")) {
            showHideLogin.classList.remove("login-active");
            setError(null)
        } else {
            showHideLogin.classList.add("login-active");
            setError(null)
        }
    }

    return (
        <div className="header">
            <div className="toggle">
                <input type="checkbox" className="checkbox" id="chbox" />
                <label className="toggle-label" onClick={toggleDarkMode}>
                    <i className="fas fa-moon">
                        <FontAwesomeIcon icon={faSun} />
                    </i>
                    <i className="fas fa-sun">
                        <FontAwesomeIcon icon={faMoon} />
                    </i>
                    <div className="ball"></div>
                </label>
            </div>
            <Social />
            <FontAwesomeIcon className="fas fa-sign-in-alt" icon={faSignInAlt} onClick={ShowLogin} />
        </div>
    )

    
}

export default Header;