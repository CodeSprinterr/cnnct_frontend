//app.jsx
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/landingPage'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Username from './pages/username'
import ProtectedRoute from './components/ProtectedRoute'

import Events from './pages/events';
import Booking from './pages/booking';
import Availabilty from './pages/Availabilty';
import Settings from './pages/setting';
import CreateEvent from './pages/createEvent';
import EditEvent from './pages/EditEvent';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/tell-us-more" element={<ProtectedRoute><Username /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="events" element={<Events />} />
          <Route path="booking" element={<Booking />} />
          <Route path="availabilty" element={<Availabilty />} />
          <Route path="settings" element={<Settings />} /> 
          <Route path="create" element={<CreateEvent />} /> 
          <Route path="edit/:eventId" element={<EditEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
