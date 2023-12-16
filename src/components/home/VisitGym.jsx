const VisitGym = () => {
  return (
    <section className="home-visit relative z-10 pt-4 pb-12  text-center lg:text-start bg-[#3E3E3E]">
      <div className="container flex justify-center items-center">
        <div className="hidden md:block">
          <img src="/images/map.webp" alt=""  className="min-h-[480px] "/>
        </div>
        <div>
          <h2 className=" lg:pl-5 text-[40px] font-bold text-costum-clr_dark_blue">VISIT <br className="md:hidden"  /> OUR GYM</h2>
          <div className=" max-w-[350px] lg:max-w-[2000px] bg-costum-clr_light_black pl-8 relative -left-3 z-[-1] px-4 py-12 rounded-2xl">
            <p className=" text-[20px] font-bold mb-3 text-white">
            <span className=" text-costum-clr_dark_yellow mr-1">Address:</span>
            <span className=" font-bold">
              12TH ST. GENERAL MATHA VILLAMOR AIR BASE PASAY CITY  
            </span>
            </p>
            <p className="text-[20px] font-bold mb-3 text-white">
            <span className=" text-costum-clr_dark_yellow mr-1 block lg:inline">Email:</span>
            <span className=" font-bold">
              Martell008@yahoo.com  
            </span>
            </p>
            <p className="text-[20px] font-bold mb-3 text-white">
            <span className=" text-costum-clr_dark_yellow mr-1 block">Contact Number:</span>
            <span className="block">
              09260417050 
            </span>
            </p>
            <h3 className=" text-[24px] text-costum-clr_thin_blue font-medium">OUR SCHOOLS.</h3>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="#"><img src="/images/visit-facebook.webp" alt="Facebook"  className=" w-[37px] h-[37px]"/></a>
              <a href="#"><img src="/images/visit-messenger.webp" alt="Messenger"  className=" w-[37px] h-[37px]"/></a>
              <a href="#"><img src="/images/visit-insta.webp" alt="Instigram"  className=" w-[37px] h-[37px]"/></a>
            </div>
            <button disabled className="mt-10 bg-white !cursor-not-allowed rounded-3xl text-[15px] font-bold min-w-[170px] py-2 px-3 text-costum-clr_dark_blue">
              See our Location 
            </button>
          </div>        
        </div>
      </div>
    </section>
  )
}

export default VisitGym