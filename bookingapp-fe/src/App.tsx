import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Rooms/Home';
// import BookingFormPage from './components/Booking/BookingFormPage';
import CreateRoom from './components/Rooms/CreateRoom';
import FormLogin from './components/Form/Form';
import ProtectedRoute from './route/ProtectedRoute';
import PrivateRoute from './route/PrivateRoute';

const App: React.FC = () => {
  return (
      <div className="App">
          <Routes>
            <Route element = {<FormLogin/>} path='/login' />
            <Route element={<ProtectedRoute/>} >
                <Route element= {<PrivateRoute/>}>
                  <Route element = { <Home/>}  path='/'   />
                  <Route element = { <CreateRoom/> } path='/add' />
                </Route>
            </Route>

           </Routes>
      </div>
  );
};

export default App;
