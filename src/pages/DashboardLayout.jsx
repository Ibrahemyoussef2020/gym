import { Outlet} from 'react-router'
import {DashboardHeader,DashboardAside} from '../layout'

const DashboardLayout = () => {

  return (
    <section className='px-10 py-5 flex overflow-auto'>   
          <DashboardAside/>
          <div className='dashboard-layout flex-1 p-5 min-w-[700px] bg-costum-clr_dark_white'>
            <DashboardHeader />
            <Outlet/> 
          </div>      
    </section>
  )
}

export default DashboardLayout