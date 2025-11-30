import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Dash from "./component/dash";
import Medicine from "./component/medicine";
import Supplier from "./component/supplier";
import Sale from "./component/sale";
import Customer from "./component/customer";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dash" element={<Dash />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/customer" element={<Customer />} />
            </Routes>
        </Router>
    );
}

export default App;

