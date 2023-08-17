import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Details from './Components/Details';
function RouteForPage() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-details" element={<Details />} />
        </Routes>
    )
}

export default RouteForPage;