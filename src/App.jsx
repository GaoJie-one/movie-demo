import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import StarBackground from './StarBackground';
import Header from '@c/Header'
import Home from './pages/Home'
import Detail from './pages/Detail'

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            {/* 背景 */}
            <StarBackground />
            {/* header */}
            <Header />
            {/* 路由注册 */}
            <Routes>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/detail/:id' element={<Detail />}></Route>
                <Route path='/' element={<Navigate to='/home' />}></Route>
            </Routes>
        </div>
    );
}

export default App; 