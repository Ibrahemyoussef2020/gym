const Footer = () => {
  return (
    <footer className="p-4 bg-white text-[#151515]">
      <div className="container flex gap-7 flex-wrap">
        <article className=" text-[20px] font-bold">
          <h3>GYM</h3>
          <ul className=" text-[15px] font-semibold">
            <li><a href="#">Why Join Us</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Plan</a></li>
            <li><a href="#">Coaches</a></li>
            <li><a href="#">Inquiry</a></li>
          </ul>
        </article>
        <article className=" text-[20px] font-bold">
          <h3>MEMBERS</h3>
          <ul className=" text-[15px] font-semibold">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </article>
        <article className=" hidden md:block text-[20px] font-bold">
          <h3>COMPANY</h3>
          <ul className=" text-[15px] font-semibold">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </article>
      </div>
    </footer>
  )
}

export default Footer