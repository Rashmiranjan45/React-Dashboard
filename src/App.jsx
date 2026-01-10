
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/auth/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Dashboard from './components/dashboard/Dashboard'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
