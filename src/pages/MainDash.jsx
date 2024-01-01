import { useQuery } from "react-query"
import { getData } from "../api"
import { Link } from "react-router-dom"
import { useState } from "react"
import { showItems , sortItems } from "../utilities"
import { useEffect } from "react"
import Calendar from 'react-calendar';


const coachesImages = [
  '/images/ibrahim.webp',
  '/images/coatch-1.webp',
  '/images/coatch-2.webp',
  '/images/man-stamina-pc.webp'
]


const MainDash = () => {
  const {data:coachQueryData} = useQuery(['coaches'],()=> getData('coaches'))
  const {data:membersQueryData} = useQuery(['members'],()=> getData('members'))
  const {data:equipmentQueryData} = useQuery(['equipments'],()=> getData('equipments'))
  
  const [date,setDate] = useState(new Date())
  const [searchValue,setSearchValue] = useState('search')
  const [members,setMembers] = useState([])
  const [isReversed,setIsReversed] = useState(false)
  const [visibleLinks , setVisibleLinks] = useState({
    coaches:false,
    payments:false
  }) 

  useEffect(()=>{
    if (!members?.length) {
      setMembers(membersQueryData)
    }
  },[searchValue,members,membersQueryData])

  const toggleLinksVisibility = (link)=>{
    const newVisbileLinks = {
      ...visibleLinks,
      [link]:!visibleLinks[link]
    }
    setVisibleLinks(newVisbileLinks)
  }

  const handleSearch = (e)=>{
    e.preventDefault() ; 
    setSearchValue(e.target.value)
    const seacrchedMembers = showItems(searchValue,'10',membersQueryData)
    setMembers(seacrchedMembers)
  }

  const handleCalender = (e)=>{
    setDate(e.target.value)
  }

  const handleSort = (e)=>{
    e.preventDefault();
    setIsReversed(!isReversed)
    const sortedlist = sortItems(members,isReversed)
    setMembers(sortedlist)
  }


  return (
    <section className="flex gap-[13px]">
      <div className="w-[469px]">
        <article className="flex justify-between pl-[28px] pr-[49px] pt-[23px] pb-[25px] bg-white rounded-2xl main-shadow">
          <div>
            <h2 className="text-[15px] mb-2 text-[#2B2B2B]">Welcome Banner, <span className=" font-bold text-costum-clr_dark_blue">Martell</span></h2>
            <p className="w-[234px] text-[10px] font-extralight">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <img src="/images/coatch-1.webp" alt=""  className="w-[90px] h-[90px]"/>
        </article>

        <div className="flex justify-between mt-[17px] gap-x-[12px] mb-[21px]">
          <article className="flex-1 justify-between px-[18px] pt-[10px] pb-[16px] bg-white rounded-2xl main-shadow">
            <div className="flex justify-between items-center mb-[21px] w-full relative">
              <h3 className=" text-[15px] font-bold">Coaches</h3>
              <button onClick={_=>toggleLinksVisibility('coaches')}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>

              <Link to='/dashboard-layout/coaches' className={`absolute top-1 right-3 z-10 py-1 px-3 border border-solid bg-white border-[#eee] rounded-lg text-[10px] font-bold text-costum-clr_dark_blue ${visibleLinks.coaches ? 'inline' : 'hidden'}`}>show all Coaches</Link>
            </div>
            <ul>
            {
                coachQueryData?.filter((coach, index) => index < 3)
                .map((coach , index) =>{
                  return <li key={coach.id} className="flex gap-2 items-center mb-[12px]">
                      <img src={coachesImages[index]} alt="" className="w-[31px] h-[31px] rounded-full" />
                      <span className="text-[12px] text-[#2B2B2B]">{coach.name}</span>
                    </li>
                })
            }
            </ul>
          </article>
          <article className="flex-1 justify-between px-[18px] pt-[10px] pb-[16px] bg-white rounded-2xl main-shadow">
            <div className="flex justify-between items-center mb-[21px] w-full relative">
              <h3 className=" text-[15px] font-bold">Sales</h3>
              <button onClick={_=>toggleLinksVisibility('payments')}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <Link to='/dashboard-layout/payments' className={`absolute top-1 right-3 py-1 px-3 border border-solid border-[#eee] rounded-lg text-[10px] font-bold text-costum-clr_dark_blue ${visibleLinks.payments ? 'inline' : 'hidden'}`}>show all Coaches</Link>
            </div>

            <div className=" w-[112px] h-[112px] relative flex justify-center items-center border-[20px] border-costum-clr_medium_blue rounded-full mx-auto">
                <span className=" text-[20px] text-[#2B2B2B] font-extrabold">84%</span>

                <div className=" absolute  rotate-[73deg] top-2 -right-6 w-[40px] h-[30px] bg-white"></div>
            </div>
          </article>
        </div>

        <h3 className=" mt-3 mb-2 text-costum-clr_dark_blue font-bold text-[15px]">Active Members</h3>    
        <div className="pl-[26px] pr-[18px] pt-[16px] pb-[5px] bg-[#74789B] rounded-2xl altr-shadow">           
            <div className="flex justify-between text-white">
              <form className="flex items-center gap-x-3">
                <input onChange={handleSearch} type="text" name="serch-coaches" id="serch-coaches" value={searchValue} placeholder="Search" className="w-[151px] py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none" />
                <button disabled>
                  <i className="fa-solid fa-magnifying-glass text-lg font-semibold"></i>
                </button>
              </form>

              <div className="mb-[20px]">
                <span className=" text-[12px] font-medium">Sort by</span>
                <button onClick={handleSort}>
                  <i className="fa-solid fa-arrow-down-up-across-line text-[#ccc] text-sm ml-2"></i>
                </button>
              </div>
            </div>
            <ul className="flex gap-3">
              <li className="w-[195px]"></li>
              <li className="text-[#ECE9E9] text-[10px] font-bold">Date paid</li>
              <li className="text-[#ECE9E9] text-[10px] font-bold">Date Expiry</li>
              <li className="text-[#ECE9E9] text-[10px] font-bold">Status</li>
            </ul>
            <div>
            {
              members?.filter((member, index)=> index < 3)?.map((member,index) => {
                return <ul key={member.id} className="mb-[27px] flex items-center justify-between text-white">
                  <li className="flex justify-between w-[195px]">
                    <div className="flex gap-2">
                      <img src={coachesImages[index]} alt="" className="w-[31px] h-[31px] rounded-full" />
                      <span className=" text-[12px] font-bold">{member.name}</span>
                    </div>
                    
                    <button>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </li>
                </ul>
              })
            }
            </div>
        </div>
      </div>
      <div className="w-[248px]">
        <article className="bg-white p-4 mb-[9px] rounded-2xl w-[187px] min-h-[178px] overflow-hidden main-shadow">
          <Calendar onChange={handleCalender} value={date} className='w-[400px]' />
        </article> 

        <h3 className=" text-[#2B2B2B] mb-[9px] text-[15px] pl-2 font-bold">Inventory</h3>
        <article className="bg-white flex flex-wrap p-4 mb-[12px] rounded-2xl w-[187px] h-[258px] main-shadow">    
            {
              equipmentQueryData?.filter((equipment,index)=> index < 4 )
              .map((equipment,index)=> <article key={equipment.id} className="p-2 w-[50%] h-[50%] max-w-[100px] border border-solid border-[#eee]">
                <img key={equipment.id} src={equipment.img} className="w-[100%] h-[100%]" />
              </article>)
            }
        </article>
      </div>
    </section>
  )
}

export default MainDash