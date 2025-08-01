import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // No need to import 'Router'
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import LogMoods from './components/LogMoods';
import MoodReports from './components/MoodReports';
import MoodCheck from './components/MoodCheck';
import Resource from './components/Resource';
import Settings from './components/Settings';


const App = () => {
  return (
    <Router>  {/* Use only BrowserRouter */}
      <div className="App">
        {/* Add your sidebar and routes here */}
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login-register" element={<LoginRegister/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/LogMoods" element={<LogMoods/>} />
          <Route path="/MoodReports" element={<MoodReports/>} />
          <Route path="/MoodCheck" element={<MoodCheck/>} />
          <Route path="/Resource" element={<Resource/>} />
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;