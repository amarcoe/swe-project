
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx"
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import { Dashboard } from "./components/Dashboard.jsx";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
