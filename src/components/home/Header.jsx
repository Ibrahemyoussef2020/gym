import { useState } from "react"
import { Link } from "react-router-dom";


const Header = () => {
    const [dropped,setDropped] = useState(false);

    // id={crypto.randomUUID()}

    return (
        <header>
            <div className="container !pl-[10px] flex justify-between items-center">
                <Link to="/dashboard-layout">
                    <picture>
                        <source media='(min-width:640px)' srcSet="images/header-stamina-pc.webp" />
                        <img src="images/header-stamina-mob.webp" alt="stamina logo" />
                    </picture> 
                </Link>            

                <nav className={`nav flex-1 flex justify-end`}>        
                    <ul className={`nav__list ${dropped ? 'nav-dropped':''} py-3 lg:py-0 absolute  z-50 top-[53px] sm:top-[70px] left-0 right-0 lg:relative lg:top-0  mb-9 font-bold justify-end flex flex-col lg:flex-row  gap-x-5 w-full text-center bg-costum-clr_dark_blue lg:bg-inherit text-white lg:text-costum-clr_medium_blue`}>
                        <li>
                            <Link to="/dashboard-layout" className="p-4 lg:p-0 block hover:opacity-70 ">Dashboard</Link>
                        </li>
                        <li>
                            <a href="#home-about" className="p-4 lg:p-0 block hover:opacity-70">Why Join Us ?</a>
                        </li>
                        <li>
                            <a href="#home-plan" className="p-4 lg:p-0 block hover:opacity-70">Plan</a>
                        </li>
                        <li>
                            <a href="#home-coatches" className="p-4 lg:p-0 block hover:opacity-70">Coatches</a>
                        </li>
                        <li>
                            <a href="#home-visit" className="p-4 lg:p-0 block hover:opacity-70">Visit our Gym</a>
                        </li>
                        <li className="text-costum-clr_medium_blue my-4 lg:my-0">
                            <a href="#register" className=" bg-costum-clr_dark_yellow hover:bg-costum-clr_light_yellow px-3 py-2 rounded-2xl" href="#">Register</a>
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