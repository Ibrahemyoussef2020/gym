import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardAside = () => {
    const [selectedMenu,setSelectedMenu] = useState('dashboard');
    const navigate = useNavigate()

    const handleDashboardControl = (e,nav)=>{
        e.preventDefault();
        setSelectedMenu(nav)
        navigate(`${nav}`)
    }

  return (
    <aside className="min-w-[226px] bg-costum-clr_dark_blue py-10  rounded-l-2xl ">
      <div className=" text-center">
        <img src="/images/ibrahim.webp" alt="Ibrahim" className="w-[50px] h-[50px] rounded-full mx-auto my-4" />
        <h1 className="-mb-1 text-[15px] font-bold text-white">Ibrahim Youssef</h1>
        <a 
        href="mailto:ibrahimYoussef95.12@gmail.com"
        className="text-[10px] text-costum-clr_dark_white"
        >
          ibrahimYoussef95.12@gmail.com
        </a>
      </div>
      <ul className=" text-white pl-[42px] mt-[42px]">
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'dashboard')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'dashboard' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/dashboard.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'admin-profile')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'admin-profile' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/admin.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Admin Profile</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'registration')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'registration' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-white overflow-visible">
              <img src="/images/register.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Registration</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'plan')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'plan' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/plan.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Plan</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'payments')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'payments' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/payment.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Payments</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'inventory')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'inventory' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/inventory.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Inventory</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'view-members')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'view-members' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/members.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>View members</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'coaches')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'coaches' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/coaches.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Coaches</span>
          </Link>
        </li>
        <li className=" text-[12px]  mb-[13px]">
          <Link onClick={e=>handleDashboardControl(e,'report')} className={`p-2 pl-4 flex items-center gap-3 rounded-l-xl ${selectedMenu === 'report' ? 'text-costum-clr_dark_blue bg-white font-bold' : 'text-costum-clr_dark_white bg-inherit'}`}>
            <div className=" bg-costum-clr_dark_blue overflow-visible">
              <img src="/images/report.png" alt=""  className="max-w-[25px] max-h-[25px]"/>
            </div>
            <span>Report</span>
          </Link>
        </li>             
      </ul>
    </aside>
  )
}

export default DashboardAside