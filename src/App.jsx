import moment from 'moment';
import {momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from 'react'
import {Flex} from '@chakra-ui/react'

// Auth Components
import CalendarComp from "./pages/Calendar";
import Navbar from "./components/Navbar/Navbar";
import Analytics from './pages/Analytics';
import Garage from './pages/Garage';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

//Non Auth Components
import Landing from './pages/Landing';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute';
import {AuthProvider} from './auth/AuthContext'

require('moment/locale/es.js')
const localizer=momentLocalizer(moment)

function App() {

    return (
        <Flex>
         <BrowserRouter>
          <AuthProvider>
          <Navbar/>   
          <Routes>
              <Route index element={<Landing/>} />
              <Route path='klndr_front/' index element={<Landing/>} />  
              <Route path='klndr_front/register' element={<Register/>} /> 
              <Route path='klndr_front/login' element={<Login/>} />  

              <Route element={<AdminRoute/>}>
                <Route path="klndr_front/adminpanel" element={<AdminPanel/>} />
              </Route>

              <Route element={<PrivateRoute/>}>
                <Route path="klndr_front/calendar" element={<CalendarComp localizer={localizer}/>} />
                <Route path="klndr_front/garage" element={<Garage/>} />
                <Route path="klndr_front/analytics" element={<Analytics/>} />
              </Route>

              <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
          </AuthProvider> 
        </BrowserRouter>
        
        </Flex>
    );
}
export default App;