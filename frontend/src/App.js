import React from 'react';
import Home from "./pages/home";
import ATLPage from './pages/atl';
import AGPTPage from './pages/agpt';
import ErrorPage from './pages/ErrorPage';
import RedirectPage from './pages/RedirectPage';
import PlansPage from './pages/plans';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const envPublicUrl = process.env.PUBLIC_URL;
  const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;
  
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<RedirectPage />} />
            <Route path="/login" element={<Home />} />
            <Route path="/atl" element={<ATLPage />} />
            <Route path="/agpt" element={<AGPTPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App;