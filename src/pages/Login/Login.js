import { useNavigate } from "react-router-dom"
//import { useCookies } from "react-cookie"
import { useState, useLayoutEffect } from "react"
import "./Login.css"
import axios from "axios"
const Login = ({ setuserCookie, userCookie }) => {
    let navigate = useNavigate()
    //  const [userTokenCookie,setuserTokenCookie]=useCookies(["user"])



    const [login, setLogin] = useState({ useremail: "", password: "" })

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

    const handleLogin = () => {
        axios({
            url: "http://localhost:5000/user/login",
            method: "POST",
            headers: {
            },
            data: { email: login.useremail, password: login.password }
        }).then(async (loginData) => {
            console.log(loginData)

            await setuserCookie("token", loginData.data.token, { path: "/" })
            console.log(userCookie.token)
            // if (userCookie.token !== "") {
            navigate("/dashboard")
            // } else {
            //     navigate("/")
            // }

        }).catch((err) => {
            window.alert(err.response.data.message)

        })
    }
    return (
        <div className="signin-main-Container" style={SizeMultiplier}>
            <div className='signin-circle'></div>

            <div className='signin-Container'>
                <div className='signin-Container2'>
                    <div className="signin-logo">Logo</div>
                    <div className="signin-message-div">Enter your Credentials to access you account</div>
                    <div className="signin-input-form-container" >
                        <input className='signin-forminput-username' type="email" name="email" placeholder='User ID' onChange={(e) => {
                            setLogin({ ...login, useremail: e.target.value })
                        }} />
                        <input className='signin-forminput-password' type="password" name="password" placeholder='Password' onChange={(e) => {
                            setLogin({ ...login, password: e.target.value })
                        }} />
                        <div className="signin-formsubmit-signin-button" onClick={handleLogin}>Sign in</div>
                        <div onClick={() => { navigate("/register") }} className='signinpage-signup-button'>Sign Up</div>
                    </div>
                </div>
            </div>

            <div className='signin-circle2'></div>
        </div>

    )

}
export default Login

