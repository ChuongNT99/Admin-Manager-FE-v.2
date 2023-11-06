import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutApp from './components/Layout/LayoutApp';
import Home from './components/Rooms/Home';
import EmployeesManager from './components/Employees/EmployeesManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutApp />}>
          <Route index element={<Home />} />
          <Route path='employeesmanager' element={<EmployeesManager />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
