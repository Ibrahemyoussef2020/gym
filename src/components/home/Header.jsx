import { useState, useContext } from "react"
import { Link } from "react-router-dom";

import { ValidityContext } from "../../contextApi";


const Header = () => {
    const [dropped,setDropped] = useState(false);

    const {validity , setValidity} = useContext(ValidityContext)

    return (
        <header>
            <div className="container !pl-[10px] pt-3 pb-2 sm:pt-1 lg:pt-0 sm:pb-0 flex justify-between items-center">
                <Link to={validity === 'admin' ? '/dashboard-layout' : '/sign-up' }>
                    <picture>
                        <source media='(min-width:640px)' srcSet="images/header-stamina-pc.webp" />
                        <img src="images/header-stamina-mob.webp" alt="stamina logo" />
                    </picture> 
                </Link>            

                <nav className={`nav flex-1 flex justify-end`}>        
                    <ul className={`nav__list ${dropped ? 'nav-dropped':''} py-3 lg:py-0 absolute  z-50 top-[70px] left-0 right-0 lg:relative lg:top-0  mb-9 lg:mb-0 font-bold justify-end flex flex-col lg:flex-row  gap-x-5 w-full text-center bg-costum-clr_dark_blue lg:bg-inherit text-white lg:text-costum-clr_medium_blue`}>
                        <li>
                            {
                                validity === 'admin' ? <Link to="/dashboard-layout/admin-profile" className="p-4 lg:p-0 block hover:opacity-70 ">Admin</Link>
                                :
                                <a href="#about" className="p-4 lg:p-0 block hover:opacity-70 ">About</a>
                            }
                        </li>
                        <li>
                            {
                            validity === 'admin' ? <Link to="/dashboard-layout/registration" className="p-4 lg:p-0 block hover:opacity-70 ">Registration</Link>
                                :
                            <a href="#home-about" className="p-4 lg:p-0 block hover:opacity-70">Why Join Us ?</a>
                            }
                        </li>
                        <li>
                            {
                            validity === 'admin' ? <Link to="/dashboard-layout/plan" className="p-4 lg:p-0 block hover:opacity-70 ">Plan</Link>
                                :
                            <a href="#home-about" className="p-4 lg:p-0 block hover:opacity-70">Plan</a>
                            }
                        </li>
                            {
                            validity === 'admin' ? <Link to="/dashboard-layout/coaches" className="p-4 lg:p-0 block hover:opacity-70 ">Coatches</Link>
                                :
                            <a href="#home-about" className="p-4 lg:p-0 block hover:opacity-70">Coatches</a>
                            }
                            {
                            validity === 'admin' ? <Link to="/dashboard-layout/payments" className="p-4 lg:p-0 block hover:opacity-70 ">Payments</Link>
                                :
                            <a href="#home-about" className="p-4 lg:p-0 block hover:opacity-70">Visit us</a>
                            }
                            <li className="text-costum-clr_medium_blue my-4 lg:my-0">
                                <Link to="/sign-up" className=" bg-costum-clr_dark_yellow hover:bg-costum-clr_light_yellow px-3 py-2 rounded-2xl">Register</Link>
                            </li>
                    </ul>

                    <button className="w-[35px] p-[2px] mb-4 sm:mb-8 inline-block lg:hidden" onClick={_=>setDropped(!dropped)}>
                        <span className=" block mt-1 py-[1.5px] w-[50%]  bg-costum-clr_medium_blue ml-auto mr-0"></span>
                        <span className=" block mt-1 py-[1.5px] w-[100%]  bg-costum-clr_medium_blue "></span>
                        <span className=" block mt-1 py-[1.5px] w-[50%]  bg-costum-clr_medium_blue mr-auto ml-0"></span>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header