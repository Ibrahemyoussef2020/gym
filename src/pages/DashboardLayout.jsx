import { Outlet } from 'react-router'
import {DashboardHeader,DashboardAside} from '../layout'

const DashboardLayout = () => {

  return (
    <div>
        <DashboardHeader />
        <DashboardAside/>
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default DashboardLayout