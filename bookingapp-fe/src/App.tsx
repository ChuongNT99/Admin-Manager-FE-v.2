import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutApp from './components/Layout/LayoutApp';
import Home from './components/Rooms/Home';
import EmployeesManager from './components/Employees/EmployeesManager';
import FormLogin from './components/Form/Form';
import BookingManager from './components/Booking/BookingManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutApp />}>
          <Route path='/login' element={<FormLogin/>}/>
          <Route index element={<Home />} />
          <Route path='employeesmanager' element={<EmployeesManager />}/>
          <Route path='bookingmanagement' element={<BookingManager/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
