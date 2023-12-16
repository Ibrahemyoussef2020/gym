
const HomeCoaches = () => {
  return (
    <section className="coaches relative overflow-hidden h-[1250px] sm:h-[900px]  lg:h-[470px] bg-[#706854]">
      <div className=" absolute flex  items-center justify-center overflow-hidden  text-start z-0 top-0 left-0 w-full h-[100%] ">
        <picture className="w-[100%] md:h-[80%]  lg:w-[80%] h-[70%] lg:h-[100%] lg:mx-auto" >
          <source media="(min-width:1024px)" srcSet="/images/cotches-bg-pc.webp"  />
          <img src="/images/cotches-bg-mob.webp" alt="" className="h-[100%] w-full mx-auto" />
        </picture>
      </div> 
      <div className="container relative z-10">
        <h2 className="text-[40px] pt-4 font-semibold underline text-white text-center">COACHES</h2>
        <div className="coaches__articels mb-5 gap-y-[80px] flex justify-around flex-wrap gap-5 mt-[70px]">
            <article className=" bg-costum-clr_thin_blue  rounded-3xl w-[268px] h-[297px]">
              <div className=" rounded-full relative top-[-60px] left-[65px]">
                <img src="/images/coatch-1.webp" alt="" />
              </div>
              <h3 className=" text-center underline text-[20px] relative top-[-40px] font-bold trasf text-costum-clr_dark_blue">Coach John</h3>
              <p className="text-sm text-costum-clr_dark_blue p-4 relative top-[-40px]  text-center">
                conditioning for members who want to improve and transform their body with Program
              </p>
            </article>
            <article className=" bg-costum-clr_thin_blue  rounded-3xl w-[268px] h-[297px]">
              <div className=" rounded-full relative top-[-60px] left-[65px]">
                <img src="/images/coatch-2.webp" alt="" />
              </div>
              <h3 className=" text-center underline text-[20px] relative top-[-40px] font-bold trasf text-costum-clr_dark_blue">Coach Martell</h3>
              <p className="text-sm text-costum-clr_dark_blue p-4 relative top-[-40px]  text-center">
                conditioning for members who want to improve and transform their body with Program
              </p>
            </article>
            <article className=" bg-costum-clr_thin_blue  rounded-3xl w-[268px] h-[297px]">
              <div className=" rounded-full relative top-[-60px] left-[65px]">
                <img src="/images/coatch-1.webp" alt="" />
              </div>
              <h3 className=" text-center underline text-[20px] relative top-[-40px] font-bold trasf text-costum-clr_dark_blue">Coach Ansel</h3>
              <p className="text-sm text-costum-clr_dark_blue p-4 relative top-[-40px]  text-center">
                conditioning for members who want to improve and transform their body with Program
              </p>
            </article>
        </div>
      </div>
    </section>
  )
}

export default HomeCoaches