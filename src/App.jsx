import { Routes , Route } from "react-router"

import {
    HomePage,
    DashboardLayout,
    Dashboard,
    Admin_Profile,
    Registration,
    Plan,
    Payment,
    Inventory,
    View_Members,
    Coaches,
    Report,
    SignIn,
    SignUp
    } from './pages'
import { BrowserRouter } from "react-router-dom"
import { useState } from "react"
    
import { ValidityContext } from "./contextApi"

const App = () => {
    const [validity , setValidity] = useState('admin')

  return (
    <BrowserRouter>
        <ValidityContext.Provider value={{validity,setValidity}}>
            <Routes>
                <Route path="/dashboard-layout" element={<SignUp />}>
                    <Route path='dashboard' element={<Dashboard />}/>
                    <Route path='admin-profile' element={<Admin_Profile />}/>
                    <Route path='plan' element={<Plan />}/>
                    <Route path='inventory' element={<Inventory />}/>
                    <Route path='view-members' element={<View_Members />}/>
                    <Route path='coaches' element={<Coaches />}/>
                    <Route path='report' element={<Report />}/>
                    <Route path='dashboard' element={<Dashboard />}/>
                </Route>

                <Route path='sign-in' element={<SignIn />}/>
                <Route path='/' element={<SignUp />}/>
                <Route path='home' element={<HomePage />}/>
            </Routes>
        </ValidityContext.Provider>
    </BrowserRouter>
  )
}

export default App