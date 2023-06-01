import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
        <Route index component={<Home/>} />
          <Route path="/" component={<Home/>} />
          <Route path="/login" component={<Login/>} />
          <Route path="/dashboard" component={<Dashboard/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;