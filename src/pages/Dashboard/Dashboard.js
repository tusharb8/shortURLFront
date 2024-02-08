import axios from 'axios';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"
import { Navigate } from 'react-router-dom';


const Dashboard = ({ setuserCookie, userCookie }) => {
    const navigate = useNavigate()
    const urlToCreateRef = useRef()
    const [updateSelf, setUpdateSelf] = useState(false)
    const dimentionMultiplier = 100;
    let calFontHeight = window.innerHeight.toString() + "px";
    let calFontWidth = window.innerWidth.toString() + "px";

    document.body.style.fontSize = ((window.innerHeight / 1117) * 100).toString() + "px";
    document.body.style.width = window.innerWidth.toString() + "px";
    document.body.style.height = window.innerHeight.toString() + "px";

    let calMulHeight = parseInt(window.innerHeight * dimentionMultiplier / 1117) / dimentionMultiplier;
    let calmulWidth = parseInt(window.innerWidth * dimentionMultiplier / 1727) / dimentionMultiplier;

    const [SizeMultiplier, setSizeMultiplier] = useState({ "--widthmultiplier": calmulWidth, "--heightmultiplier": calMulHeight, height: calFontHeight, width: calFontWidth });

    const [allUrls, setAllUrls] = useState([])
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

    useEffect(() => {
        axios({
            url: "http://localhost:5000/url/getall",
            method: "GET",
            headers: {
                authorization: userCookie.token
            },
        }).then(allUrlResp => {
            console.log("allUrlResp", allUrlResp.data)
            setAllUrls(allUrlResp.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [updateSelf])

    const handleUrlCreate = async () => {
        const url = urlToCreateRef.current.value;
        const createURLResp = axios({
            url: "http://localhost:5000/url",
            method: "POST",
            headers: {
                authorization: userCookie.token
            },
            data: {
                urltoshorten: url
            }
        }).catch(err => {
            console.log(err)
        })

        console.log("createURLResp", createURLResp.data)
        setUpdateSelf(prev => !prev)
    }
    const handleLogOut = async ()=>{
        await setuserCookie("token", "", { path: "/" })
        navigate("/")
    }
    return (
        <div className='Dashboard-page'>
            <div>Dashboard <button onClick={handleLogOut}>Logout</button></div>
            <div className='Dashboard-EnterURL-cont'>
                <div>Enter URL to Shorten</div>
                <div>:</div>
                <input ref={urlToCreateRef} type='url' className='dashboard-inputurl' />
                <button onClick={handleUrlCreate}>Create</button>
            </div>
            <div className='Dashboard-table'>
                <div className="Dashboard-table-title" >
                    <div className="Dashboard-table-title-srno">SR no</div>
                    <div className="Dashboard-table-title-yoururl">Your url</div>
                    <div className="Dashboard-table-title-shortenurl">Shortened url</div>
                    <div className="Dashboard-table-title-clicks">no of clicks</div>
                    <div className="Dashboard-table-title-actions">Actions</div>
                </div>
            </div>
            {allUrls.map((url, i) => {
                return <div className='Dashboard-table'>
                    <div className="Dashboard-table-title" >
                        <div className="Dashboard-table-title-srno" style={{ fontSize: "1.2rem", fontWeight: 400 }}>{i + 1}</div>
                        <div className="Dashboard-table-title-yoururl" style={{ fontSize: "1.2rem", fontWeight: 400 }}>{url.redirectURL}</div>
                        <div className="Dashboard-table-title-shortenurl" style={{ fontSize: "1.2rem", fontWeight: 400 }}>
                            <a href={`http://localhost:5000/${url.shortId}`} target='_blank'
                                onClick={() => { setUpdateSelf(prev => !prev) }}>{url.shortId}</a>
                        </div>
                        <div className="Dashboard-table-title-clicks" style={{ fontSize: "1.2rem", fontWeight: 400 }}>{url.visited.length}</div>
                        <div className="Dashboard-table-title-actions" style={{ fontSize: "1.2rem", fontWeight: 400 }}>
                            <button>Get Details</button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Dashboard