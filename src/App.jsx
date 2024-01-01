import { Routes , Route } from "react-router"

import {
    HomePage,
    DashboardLayout,
    MainDash,
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
    
import { ValidityContext , RememberMeContext } from "./contextApi"
import {
    validityLocalStorage,
    rememberMeLocalStorage
} from './localStorage'


const App = () => {
    const [validity , setValidity] = useState(validityLocalStorage)
    const [rememberMe,setRememberMe] = useState(rememberMeLocalStorage) 

  return (
    
        <BrowserRouter>
            <ValidityContext.Provider value={{validity,setValidity}}>
            <RememberMeContext.Provider value={{rememberMe,setRememberMe}}>
                <Routes>           
                    <Route path="/dashboard-layout" element={<DashboardLayout />}>
                        <Route  path='' element={<MainDash />}/>
                        <Route path='admin-profile' element={<Admin_Profile />}/>
                        <Route path="registration" element={<Registration/>}/>           
                        <Route path='plan' element={<Plan />}/>
                        <Route path="payments" element={<Payment/>}/>
                        <Route path='inventory' element={<Inventory />}/>
                        <Route path='view-members' element={<View_Members />}/>
                        <Route path='coaches' element={<Coaches />}/>
                        <Route path='report' element={<Report />}/>       
                    </Route>

                    <Route path='/' element={<SignIn />}/>
                    <Route path='sign-up' element={<SignUp />}/>
                    <Route path='home' element={<HomePage />}/>       
                </Routes>
            </RememberMeContext.Provider>
            </ValidityContext.Provider>  
        </BrowserRouter>
  )
}

export default App