const MainStart = () => {
    return (
        <>
        <section className='main-start hidden md:block pt-[100px] pb-[150px]'>
            <div className="container flex flex-nowrap items-center justify-between gap-x-12">
                
                <div className="text-intro min-w-[300px] relative z-20  lg:pr-10  text-[36px] lg:text-[50px] font-bold">
                    <p className=" text-white p-0">Start a better <br/> shape of you!</p>    
                    <span className=" text-white"> Come Join Us!</span>
                    <a href='#' className="block w-fit bg-white mt-2 text-[#3E3E3E] hover:bg-costum-clr_dark_yellow py-2 px-3 !text-[20px] rounded-3xl"> Learn More</a>
                </div>

                <div className="mx-auto  relative z-30 ">
                    <img src="images/cover-stamina-pc.webp" alt="stamina logo" className="w-[350px] lg:w-[400px]" />
                </div>
            </div>
        </section>


        <section className='main-start md:hidden py-12'>
            <div className="container font-bold">
         
            
                <img src="images/cover-stamina-mob.webp" alt="stamina logo"  className="mx-auto "/>
      

                <div className="text-intro relative z-20 text-[36px] sm:text-[45px] py-2 max-w-[300px] sm:max-w-[400px] mx-auto text-center ">
                <p className=" text-white">Start a better shape of you!</p>    
                <span className=" text-white"> Come Join Us!</span>
                <a href='#' className="block w-fit bg-white mt-4 text-[#3E3E3E] mx-auto hover:bg-costum-clr_dark_yellow py-2 px-3 !text-[20px] rounded-3xl"> Learn More</a>
                </div>
            </div>
        </section>
        </> 
    )
}

export default MainStart