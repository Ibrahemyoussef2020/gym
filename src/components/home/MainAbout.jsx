import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


const MainAbout = () => {
    return (
        <section className='main-about pb-5 about relative bg-costum-clr_dark_blue py-5 md:pb-0 text-white text-center'>
            <div className="relative z-10 overflow-hidden ">
                <div className='container'>
                    <h2 className='about__heading text-lg mb-5'>about</h2>
                    <p className=' stamina-p text-[37px] 2xl:text-[60px] font-black p-0  text-center md:text-start max-w-[300px] sm:max-w-[400px] mx-auto md:mx-0 md:max-w-[1500px]  lg:text-[45px]'>
                        STAMINA GYM FOR MAN & WOMEN
                    </p>
                </div>
                <div className='flex'>
                    <div className=' hidden md:block relative  max-w-[300px] xl:max-w-[400px] 2xl:max-w-[450px]'>
                        <img src="/images/man-stamina-pc.webp" alt="strong"  className='w-full h-[100%]'/>
                    </div>
                    <div className=" max-w-[100vw] flex-1 overflow-hidden lg:overflow-visible">
                        <p className='mx-auto lg:mx-0  relative z-30 text-costum-clr_light_yellow pt-7  sm:text-[20px]   sm:text-start  w-[80%] max-w-[300px] sm:max-w-[650px]  md:w-[400px] xl:w-[450px] 2xl:w-[700px] '>
                            Stamina Gym Fitness Center provides proper training and conditioning for members who want to improve and transform their body with Program depend on the body composition.
                        </p>
                        <div className='pc-offers mb-20 px-2 sm:pl-12 md:pl-0'>
                            <h2 className=' hidden pl-4 md:pl-7 lg:pl-0 sm:block text-[46px]  text-start my-5'>What we offer:</h2>
                            <div className=' lg:hidden overflow-hidden lg:overflow-visible  max-w-[450px] mt-10 gap-x-8 '>
                                <Swiper
                                    slidesPerView={2}
                                    loop={true}
                                    spaceBetween={0}
                                    pagination={true}
                                    modules={[Pagination]}
                                     breakpoints={{
                                    768: {
                                      slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                    },
                                    1200: {
                                        slidesPerView: 3,
                                    },                            
                                  }}
                                    className="h-[100%]"
                                >
                                    <SwiperSlide className="min-w-[190px]">
                                        <article className='p-2 italic ff-js mx-auto rounded-3xl bg-white w-[180px] h-[180px]'>
                                            <div className='rounded-3xl h-[100%] flex justify-center items-center px-5 border border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                                                <div>
                                                    <span className='text-[64px] font-black leading-[1]'>24 /7</span>
                                                    <span className='text-[24px] font-bold leading-[1] -ml-2'>chat</span>
                                                </div>
                                            </div>
                                        </article>
                                    </SwiperSlide>

                                    <SwiperSlide className="min-w-[190px]">
                                        <article className='p-2 italic ff-js rounded-3xl mx-auto bg-white w-[180px] h-[180px]'>
                                            <div className='rounded-3xl h-[100%] flex flex-col justify-center items-center px-1 border border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                                                <p className='text-[48px] font-black leading-[1]'>1 <span className=' font-bold'>on</span> 1</p>
                                                <span className='text-[24px] mt-2 font-bold leading-[1]'>coaching</span>
                                            </div>
                                        </article>
                                    </SwiperSlide>

                                    <SwiperSlide className="min-w-[190px]">
                                        <article className='p-2 italic ff-js rounded-3xl mx-auto bg-white w-[180px] h-[180px]'>
                                            <div className='rounded-3xl h-[100%]  px-1 border border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                                                <div>
                                                    <div className='ml-auto mr-2 mt-1 w-fit border-[25px] p-6 rounded-full border-solid border-costum-clr_dark_blue'>

                                                    </div>
                                                    <p className='max-w-[120px] pl-2 text-[20px] text-start font-bold'>
                                                        Nutrition Plan Guide
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="articles hidden lg:flex justify-start gap-10 xl:gap-20 relative z-20">
                                <article className='p-2 relative z-10 italic ff-js rounded-3xl bg-white w-[180px] h-[180px]'>
                                    <div className='rounded-3xl h-[100%] flex justify-center items-center px-5 border border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                                        <div>
                                            <span className='text-[64px] font-black leading-[1]'>24 /7</span>
                                            <span className='text-[24px] font-bold leading-[1] -ml-2'>chat</span>
                                        </div>
                                    </div>
                                </article>
                                <article className='p-2 relative z-10 italic ff-js rounded-3xl bg-white w-[180px] h-[180px]'>
                                    <div className='rounded-3xl h-[100%] flex flex-col justify-center items-center px-1 border border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                                        <p className='text-[48px] font-black leading-[1]'>1 <span className=' font-bold'>on</span> 1</p>
                                        <span className='text-[24px] mt-2 font-bold leading-[1]'>coaching</span>
                                    </div>
                                </article>
                                <article className='p-2 relative z-10 italic ff-js rounded-3xl bg-white w-[180px] h-[180px]'>
                                    <div className='rounded-3xl h-[100%]  px-1 border border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue'>
                                        <div>
                                            <div className='ml-auto mr-2 mt-1 w-fit border-[20px] p-2 rounded-full border-solid border-costum-clr_dark_blue'>
                                                <i className="fa-solid fa-heart text-costum-clr_dark_blue text-[30px]"></i>
                                            </div>
                                            <p className='max-w-[120px] pl-2 text-[20px] text-start font-bold'>
                                                Nutrition Plan Guide
                                            </p>
                                        </div>
                                    </div>
                                </article>
                                <div className="protein-bg absolute bottom-[-50px] 2xl:bottom-[-100px] right-0 z-0 w-[400px] h-[500px]">
                                    <img src="/images/protein.webp" alt="" className="w-full h-[100%]"/>                      
                                </div>
                            </div>                     
                        </div>
                    </div>
                </div>            
            </div>           
        </section>
    )
}

export default MainAbout