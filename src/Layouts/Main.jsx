
import Navbar from '../Components/Navbar.jsx'
import  { BrowserRouter, HashRouter, Routes , Route } from "react-router-dom";
import Home from '../Components/Home.jsx'
import About from '../Components/About.jsx'
import Login from '../Components/Login.jsx'
import Register from '../Components/Register.jsx'


function Main() {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <div className="content">
                
                    <Routes >
                        <Route exact path="/" element={<Home />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Main;