import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
const App = () => {
  const [userTokenCookie, setuserTokenCookie, removeuserTokenCookie] = useCookies(["token"])
  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register setuserCookie={setuserTokenCookie} userCookie={userTokenCookie} />}></Route>
            <Route path="/" element={<Login setuserCookie={setuserTokenCookie} userCookie={userTokenCookie} />}></Route>
            <Route path="/dashboard" element={<Dashboard setuserCookie={setuserTokenCookie} userCookie={userTokenCookie} />}></Route>
</Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  )
}
export default App