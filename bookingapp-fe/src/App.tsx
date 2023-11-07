import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Rooms/Home';
// import BookingFormPage from './components/Booking/BookingFormPage';
  import LayoutApp from './components/Layout/LayoutApp';
import CreateRoom from './components/Rooms/CreateRoom';
import FormLogin from './components/Form/Form';
import ProtectedRoute from './route/ProtectedRoute';
import PrivateRoute from './route/PrivateRoute';
  import EmployeesManager from './components/Employees/EmployeesManager';
import BookingManager from './components/Booking/BookingManager';

const App: React.FC = () => {
  return (
      <div className="App">
          <Routes>
            <Route element = {<FormLogin/>} path='/login' />
            <Route element={<ProtectedRoute/>} >
                <Route element= {<PrivateRoute/>}>
                  <Route path="/" element={<LayoutApp />}>
                    <Route element = { <Home/>}  path='/'   />
                    <Route element = { <CreateRoom/> } path='/add' />
                    <Route path='employeesmanager' element={<EmployeesManager />}/>
                    <Route path='bookingmanagement' element={<BookingManager/>}/>
                   </Route>
                </Route>
            </Route>

           </Routes>
      </div>
  );
};

export default App;
