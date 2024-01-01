
const HomeRegister = () => {
  return (
    <section className="home-register overflow-hidden relative bg-white pt-4 pb-12  z-1">
      <div className="container overflow-visible">
        <h2 className=" lg:pl-5 mb-6 text-white lg:mb-2 text-center text-[40px] font-bold">REGISTER</h2>
        <div className="flex justify-center">
          <form onSubmit={e => e.preventDefault()} action="#" className="min-w-[300px] max-w-[350px] lg:min-w-[400px] lg:max-w-[2000px]">
            <div className="bg-white px-4 py-12 rounded-2xl">
              <label htmlFor="first-name" className="block mb-3">
                <p className=" font-bold text-[20px] mb-3">First Name</p>
                <input type="text" id="first-name" className=" w-full rounded-2xl bg-costum-clr_thin_gray text-[20px] min-h-[40px]" />
              </label>
              <label htmlFor="last-name" className="block mb-3">
                <p className=" font-bold text-[20px] mb-3">Last Name</p>
                <input type="text" id="last-name" className=" w-full rounded-2xl bg-costum-clr_thin_gray text-[20px] min-h-[40px]" />
              </label>
              <label htmlFor="email" className="block mb-3">
                <p className=" font-bold text-[20px] mb-3">Email</p>
                <input type="text" id="email" className=" w-full rounded-2xl bg-costum-clr_thin_gray text-[20px] min-h-[40px]" />
              </label>
              <label htmlFor="phone" className="block">
                <p className=" font-bold text-[20px] mb-3">Phone</p>
                <input type="text" id="phone" className=" w-full rounded-2xl bg-costum-clr_thin_gray text-[20px] min-h-[40px]" />
              </label>
            </div>
            <div className="py-4 flex gap-3">
              <button className=" bg-costum-clr_dark_yellow hover:bg-costum-clr_light_yellow text-costum-clr_dark_blue text-[20px] font-bold py-1 px-3 rounded-3xl">Submit</button>
              <button className=" bg-white hover:bg-costum-clr_dark_white text-[#2B2B2B] text-[20px] font-bold py-1 px-3 rounded-3xl">Clear Entries</button>
            </div>
          </form>
          <div className="transformers hidden md:block">
            <h2 className=" text-[30px] lg:text-[40px] text-[#DEBA3B] pl-4 pt-4 mb-2 font-semibold">Customer’s Progress</h2>
            <div className="flex">
              <img src="/images/reg-pc-1.webp" alt=""  className=""/>
              <img src="/images/reg-pc-2.webp" alt=""  className=" hidden md:block"/>
              <img src="/images/reg-pc-3.webp" alt=""  className=" hidden md:block"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeRegister