import { Link } from "react-router-dom"

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center">
      <Link to='/home'>
        <img src="/images/header-stamina-pc.webp" alt="stamina logo" />
      </Link> 
      <div className="flex gap-4 relative -mt-7 items-center text-costum-clr_dark_blue cursor-not-allowed">
        <span className=" text-[14px]">Feedback</span>
        <i className="fa-solid fa-bell"></i>
      </div>         
    </header>
  )
}

export default DashboardHeader