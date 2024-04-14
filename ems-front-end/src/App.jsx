import { useState } from 'react'

import './App.css'
import HeaderComponent from "./components/HeaderComponent.jsx";
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent.jsx";


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={  <ListEmployeeComponent/>}></Route>
                        <Route path='/employees' element={  <ListEmployeeComponent/>}></Route>
                        <Route path='/add-employee' element={  <EmployeeComponent/>}></Route>
                        <Route path='/edit-employee/:id' element={  <EmployeeComponent/>}></Route>
                    </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </div>
    );
}

export default App
