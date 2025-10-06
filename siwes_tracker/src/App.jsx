import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Setup from './pages/AccountSetup'
import UserPage from './pages/UserPage'
import Dashboard_home from './components/app_components/Dashboard_home'
import Logbook from './components/app_components/Logbook_section'
import Reports from './components/app_components/Reports_section'
import Attendance from './components/app_components/Attendance_section'
import Settings from './components/app_components/Settings_section'
import SignIn from './pages/login'
import Signup from './pages/signup'

function App (){
    return(
        <Router>
        <Routes>
            <Route path ='/' element={<LandingPage/>}/>
            <Route path ='/login' element={<SignIn/>}/>
            <Route path ='/signup' element={<Signup/>}/>
            <Route path='*' element={<LandingPage/>}/>
            <Route path='/setup' element={<Setup/>}/>
            <Route path='/user' element={<UserPage/>}>
                <Route index element={<Dashboard_home/>}/>
                <Route path='home' element={<Dashboard_home/>}/>
                <Route path='logbook' element={<Logbook/>}/>
                <Route path='reports' element={<Reports/>}/>
                <Route path='attendance' element={<Attendance/>}/>
                <Route path='settings' element={<Settings/>}/>
            </Route>
        </Routes>
        </Router>
    )
}

export default App;

