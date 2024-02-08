import React, { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import "./Register.css"

const Register = ({ setuserCookie, userCookie }) => {
    let navigate = useNavigate()

    const [signUpState, setSignupState] = useState({
        username: "",
        useremail: "",
        password: "",
        cpassword: ""
    })


    const dimentionMultiplier = 100;
    let calFontHeight = window.innerHeight.toString() + "px";
    let calFontWidth = window.innerWidth.toString() + "px";

    document.body.style.fontSize = ((window.innerHeight / 1117) * 100).toString() + "px";
    document.body.style.width = window.innerWidth.toString() + "px";
    document.body.style.height = window.innerHeight.toString() + "px";

    let calMulHeight = parseInt(window.innerHeight * dimentionMultiplier / 1117) / dimentionMultiplier;
    let calmulWidth = parseInt(window.innerWidth * dimentionMultiplier / 1727) / dimentionMultiplier;

    const [SizeMultiplier, setSizeMultiplier] = useState({ "--widthmultiplier": calmulWidth, "--heightmultiplier": calMulHeight, height: calFontHeight, width: calFontWidth });

    useLayoutEffect(() => {
        function handleResize() {
            let calFontHeight = window.innerHeight.toString() + "px";
            let calFontWidth = window.innerWidth.toString() + "px";
            let calMulHeight = (parseInt(window.innerHeight * dimentionMultiplier / 1117) / dimentionMultiplier);
            let calmulWidth = (parseInt(window.innerWidth * dimentionMultiplier / 1727) / dimentionMultiplier);
            setSizeMultiplier({ "--widthmultiplier": calmulWidth, "--heightmultiplier": calMulHeight, height: calFontHeight, width: calFontWidth });
            console.log(calmulWidth, calMulHeight);
            console.log(calFontHeight, calFontWidth);
            document.body.style.fontSize = ((window.innerHeight / 1117) * 100).toString() + "px";
            document.body.style.width = window.innerWidth.toString() + "px";
            document.body.style.height = window.innerHeight.toString() + "px";
            console.log(SizeMultiplier)
        }
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize) };
    }, []);

    const handleUserdd = (e) => {
        // console.log(signUpState)
        e.preventDefault()
        if (signUpState.useremail.includes("@") && signUpState.useremail.split("@")[1].includes(".")) {
            if (signUpState.password === signUpState.cpassword) {
                axios({
                    url: 'http://localhost:5000/user/register',
                    method: "POST",
                    headers: {

                    },
                    data: {
                        name:signUpState.username,
                        email:signUpState.useremail,
                        password:signUpState.password
                    }
                }).then((res) => {
                    // console.log(res.data.message)
                    // window.alert(res.data)
                    // console.log(res.data.message)
                    window.alert(res.data.message)
                    navigate("/")
                }).catch((err) => {
                    window.alert(err.response.data.message)
                    // console.log(err)
                })
            }
            else {
                alert("Passwords are not matching")
            }
        }
        else {
            alert("Pls input valid email")
        }

    }

    return (
        <div className="signup-main-Container" style={SizeMultiplier}>
            <div className='signup-circle'></div>
            <div className='signup-Container'>
                <div className='signup-Container2'>
                    <div className='signup-logo'>Logo</div>
                    <div className='signup-message-div'>Create New Account</div>
                    <form className="signup-input-form-container" >
                        <input className='signup-forminput-username' id="tag1" type="email" name="email" placeholder='Enter Your Email' onChange={(e) => {
                            setSignupState({ ...signUpState, useremail: e.target.value })
                        }} />
                        <input className='signup-forminput-username' id="tag3" type="text" name="name" placeholder='Enter Your Name' onChange={(e) => {
                            setSignupState({ ...signUpState, username: e.target.value })
                        }} />
                        <input className='signup-forminput-password' id="tag2" type="password" name="password" placeholder='Enter your Password' onChange={(e) => {
                            setSignupState({ ...signUpState, password: e.target.value })
                        }} />
                        <input className='signup-forminput-confirm-password' id="tag3" type="password" name="cpassword" placeholder='Confirm Password' onChange={(e) => {
                            setSignupState({ ...signUpState, cpassword: e.target.value })
                        }} />
                        <div className="signup-formsubmit-signup-button" onClick={handleUserdd}>Sign Up</div>
                        <div onClick={() => { navigate("/") }} className='signuppage-signin-button'>Sign In</div>
                    </form>
                </div>
            </div>
            <div className='signup-circle2'></div>
        </div>

    )
}
export default Register
