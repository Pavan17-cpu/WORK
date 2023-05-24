import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App2 from './App2';
import WorksList from './WorksList';
import AddWorkForm from './AddWorkForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App2 />} />
        <Route path="/addwork" element={<AddWorkForm/>} />
        <Route path="/works" element={<WorksList/>} />
      </Routes>
    </Router>
  );
}

export default App;