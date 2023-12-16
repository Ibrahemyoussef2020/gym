const OurPlan = () => {
  return (
    <section className="plan bg-white  relative h-[900px] sm:h-[600px] lg:h-[500px] ff-js">
        <div className="paln__bg relative  overflow-hidden  w-full h-[100%]">
        </div>
        <div className="container plan-intro pt-[70px] absolute top-0 left-0 right-0 bottom-0">
          <h2 className=" text-center lg:text-end text-[36px] 2xl:text-[45px] font-bold pl-8  text-costum-clr_dark_blue lg:text-costum-clr_medium_black"><span className=" text-white sm:text-inherit">JOIN</span> &nbsp; OUR <span className=" text-white md:text-inherit">MEMBE</span>RSHIP</h2>
          <div className="our-plan">
            <h2 className=' hidden lg:block text-[46px] text-start pl-7 relative -top-4  text-white font-semibold'><span className=' text-costum-clr_medium_blue xl:text-red-500 mr-3'>our</span> Plan:</h2>
            <div className="articles  max-h-[700px] overflow-auto  xl:pl-12 mt-6 lg:mt-0 flex flex-wrap justify-center lg:justify-start gap-y-10 gap-x-5 lg:gap-x-3 xl:gap-x-10 relative z-20">
                <article className='p-2 relative z-10 italic ff-js rounded-3xl bg-white w-[150px] lg:w-[170px] h-[170px] border-2 border-solid border-costum-clr_dark_blue'>
                    <div className='rounded-2xl h-[100%] flex justify-center items-center px-5 border-2 border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                        <picture>
                        <source media="(min-width:767px)" srcSet="/images/join-1.webp" />
                          <img src="/images/join-1.webp" alt="join"  className='mx-auto'/>
                          <p className=" text-md font-bold text-costum-clr_dark_blue text-center">Annual<br/> Membership</p>
                        </picture>
                    </div>
                </article>
                <article className='p-5 lg:mt-6 relative bg-costum-clr_light_black z-10 italic ff-js rounded-2xl w-[150px] lg:w-[160px] h-[170px] border-2 border-solid border-white'>
                    <img src="/images/join-mob-2.webp" alt="join"  className='ml-auto mr-1'/>
                    <p className=" text-[24px] lg:text-[32px] font-black text-white relative -top-7">7<br/> Days</p>
                    <p className="font-semibold text-[13px] lg:text-md text-white relative -top-4">Weekly Rate</p>
                </article>
                <article className='p-5 relative  bg-costum-clr_light_blue z-10 italic ff-js rounded-2xl w-[150px] lg: w-[160px] h-[170px] border-2 border-solid border-white'>
                    <img src="/images/join-mob-3.webp" alt="join"  className='ml-auto mr-1'/>
                    <p className=" text-[24px] lg:text-[32px] font-black text-white relative -top-7">1<br/> Month</p>
                    <p className="font-semibold text-[13px] lg:text-md text-white relative -top-4">monthly Rate</p>
                </article>
                <article className='p-5 lg:mt-6 relative bg-costum-clr_medium_blue  z-10 italic ff-js rounded-2xl w-[150px] lg:w-[160px] h-[170px] border-2 border-solid border-white'>
                    <img src="/images/join-mob-4.webp" alt="join"  className='ml-auto mr-1'/>
                    <p className=" text-[24px] lg:text-[32px] font-black text-white relative -top-7">6<br/> Months</p>
                    <p className="font-semibold text-[13px] lg:text-md text-white relative -top-4">Biannual Rate</p>
                </article>
                <article className='p-5 relative mb-1 bg-costum-clr_dark_blue  z-10 italic ff-js rounded-2xl w-[150px] lg:w-[160px] h-[170px] border-2 border-solid border-white'>
                    <img src="/images/join-mob-5.webp" alt="join"  className='ml-auto mr-1'/>
                    <p className=" text-[24px] lg:text-[32px] font-black text-white relative -top-7">1<br/> Year</p>
                    <p className="font-semibold text-[13px] lg:text-md text-white relative -top-4">Annual Rate</p>
                </article>
              </div> 
          </div>
        </div>
    </section>
  )
}

export default OurPlan