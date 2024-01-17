import { Link } from "react-router-dom"

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center pr-[41px]">
      <Link to='/home'>
        <img src="/images/header-stamina-pc.webp" alt="stamina logo" />
      </Link> 
      <div className="flex gap-[32px] relative  items-center text-costum-clr_dark_blue cursor-not-allowed">
        <span className=" text-[14px] font-semibold">Feedback</span>
        <i className="fa-solid fa-bell text-2xl"></i>
      </div>         
    </header>
  )
}

export default DashboardHeader