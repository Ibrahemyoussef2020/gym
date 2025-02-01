import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useRef, useState } from "react"
import { useNavigate,useLocation } from "react-router";
import { useQuery } from "react-query";
import {modifyData,getData} from '../api'

import { 
  useCostumMutation,
  showItems,
  divideData,
  selectDateMonth,
  sortItems
} from "../utilities"


import { toast, Toaster } from "sonner";

const View_Members = () => {
  let location = useLocation();
  const cleanUpRef = useRef(false)

  const {data:membersQueryData,refetch} = useQuery(['members'],()=> getData('members'))
  const {mutate: modifyMutate} = useCostumMutation(modifyData,['members']) 
  
  const [searchValue,setSearchValue] = useState('search')
  const [selectedNumber,setSelectedNumber] = useState('10')
  const [dividedQueryData,setDividedQueryData] = useState([]) 
  const [isDataShowenReverse,setIsDataShowenReverse] = useState(true)
  
  const [doesModifiedFormOpen,setDoesModifiedFormOpen] = useState(false)

  const [targetId,setTargetId] = useState('')
  const [textError , setTextError] = useState('')
  const [register,setRegister] = useState({
    name:'',
    date:'',
    email:'',
    concat:'',
    plan:'',
    price:0,
    'date-enrolled':'',
    'date-expiration':'',
  })


  useEffect(_=>{
    let itemsShowen;
    if (cleanUpRef.current === false) {
       itemsShowen = showItems(searchValue,selectedNumber,membersQueryData)
  
      setDividedQueryData(divideData(itemsShowen))
    }
    return async _=>{
      if (itemsShowen?.length) {
        await refetch()
      }
    }
  },[searchValue,selectedNumber,membersQueryData])


//--------------------   start modify methods     ---------------//

  const showModificationForm = (id)=>{
    const selectedItem = membersQueryData.filter(query => query.id === id)
    setRegister({
      ...selectedItem[0]
    })
    
    setDoesModifiedFormOpen(true)
  }

  const handleModifyMemberQuery = (id) => {
      const modifiedRegister = {
        ...register
      }
       modifyMutate({seletedData:'members',targetId,...modifiedRegister})
  } 

  const clearModificationForm = ()=>{
    const emptyValues = {
      name:'',
      date:'',
      email:'',
      concat:'',
      plan:'',
      price:0,
      'date-enrolled':'',
      'date-expiration':'',
    }
    setRegister(emptyValues)
    setDoesModifiedFormOpen(false)
  }


  const handleSubmitModifications = (e , id) =>{
    e.preventDefault();
    handleModifyMemberQuery(id)
    clearModificationForm()
    toast.success('Member informations have added')
    return true
  }

  const handleChangeValues = e =>{
    const {name,value} = e.target;
    const modifiedRegister  = {
      ...register,
      [name]:value
    }
    setRegister(modifiedRegister)
  }

  //--------------------      end modify methods     ---------------//

  const handleSearch = (e)=>{
    e.preventDefault() ; 
    showItems(searchValue,membersQueryData)
  }

  const handleSort = e=>{
    e.preventDefault()
    setIsDataShowenReverse(!isDataShowenReverse)

   const itemsShowen = showItems(searchValue,selectedNumber,membersQueryData)
  
   const sortedImes = sortItems(itemsShowen,isDataShowenReverse)

   setDividedQueryData(divideData(sortedImes))
  }


  return (
    <section className="realative mt-[45px]">
      
    <h1 className=" text-[32px] font-bold  text-costum-clr_dark_blue mt-[5px] mb-[10px]">Active Members</h1>
    <form onSubmit={handleSubmitModifications} action="#" className={`w-[623px]   min-h-[354px] flex flex-wrap items-start gap-x-4 gap-y-4  popup  pt-[30px] pb-[40px] px-[34px] absolute z-50 bg-white rounded-2xl ${ doesModifiedFormOpen ?  'block' : 'hidden'} main-shadow`}>
        <label htmlFor="name" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Name of Participant</p>
          <input value={register.name} onChange={handleChangeValues} id="name" name="name" type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="date" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Date of Join</p>
          <input value={register.date} onChange={handleChangeValues} id="date" name="date" type="date" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="email" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Email Address</p>
          <input value={register.email} onChange={handleChangeValues} id="email" name="email"  type="email" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="concat" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Contact No.</p>
          <input value={register.concat} onChange={handleChangeValues} id="concat" name="concat" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <div className="flex flex-1 gap-x-2 max-w-[50%]">
          <label htmlFor="plan" className="flex-1">
            <p className="font-bold pb-1">Plan</p>
            <input value={register.plan} onChange={handleChangeValues} id="plan" name="plan" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
          <label htmlFor="price" className="flex-1">
            <p className="font-bold pb-1">Price</p>
            <input value={register.price} onChange={handleChangeValues} id="price" name="price" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
        </div>
        <div className="flex gap-x-3 w-full justify-end">
          <button type="submit" name="submit" className="font-bold py-1 px-4 rounded-xl text-white bg-costum-clr_dark_blue">Modify Member</button>
          <button name="clear" type="button" onClick={clearModificationForm} className="font-bold py-1 px-4 rounded-xl text-costum-clr_dark_blue border border-solid border-costum-clr_dark_blue">Cancel</button>
        </div>
        <p className={`text-error mb-2 text-red-500 text-sm mt-2 bg-white ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
      </form>


      <div className="py-[20px] px-[30px] rounded-2xl h-[500px]  bg-[#77749B] relative z-0 text-white altr-shadow">
       <div>
          <h2 className=" text-[20px] font-bold mb-4">Gym Members</h2>
          <div className="flex justify-between mb-8">
            <form className="flex items-center gap-x-2">
              <span className=" text-[12px]">Show Entities</span>
              <select onChange={e=> {setSelectedNumber(e.target.value) ; cleanUpRef.current = false}} name="show-num-coaches" id="show-num-coaches" className="py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none">
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
              </select>
            </form>

            <form className="flex items-center gap-x-3">
              <input onChange={e=>{setSearchValue(e.target.value) ; cleanUpRef.current = false}} type="text" name="serch-coaches" id="serch-coaches" value={searchValue} placeholder="Search" className="w-[151px] py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none" />
              <button onClick={e=>handleSearch(e)}>
                <i className="fa-solid fa-magnifying-glass text-3xl font-semibold"></i>
              </button>
            </form>
          </div>
       </div>
       <ul className="flex justify-between mb-[18px] py-3">
          <li className="w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
            <button onClick={handleSort}>
             <i className="fa-solid fa-arrow-down-up-across-line text-[#ccc] mr-1"></i>
            </button>
            <span className="text-[14px] font-bold">Name</span>
          </li>
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className=" text-[14px] font-bold">Member ID</span>
          </li>
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Date Enrolled</span>
          </li>
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Date Expiration</span>
          </li>
          <li className="ml-4">
            <span className="w-[40px] whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-bold">Actions</span>
          </li>
        </ul> 
       <Swiper
        loop={true}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="h-[262px]"
      >
        
        {
       
          dividedQueryData?.map(page  => {
            return (
              <SwiperSlide
                key={Math.random() + '' + new Date()}                     
              >
                {
                  page?.map(item => {
            
                    return <ul key={item.id} className="flex text-[12px] mb-4 py-3">
                      <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.id.slice(0,10)}</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item['date-enrolled']}</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item['date-expiration']}</li>
                      <li>
                        <button onClick={_=>showModificationForm(item.id)} className="py-1 px-2 bg-white rounded-2xl text-center text-[10px] text-[#2B2B2B]">edite</button>
                      </li>
                    </ul>
                  })
                }
            </SwiperSlide>
            )
          })      
        }   
      </Swiper>
      </div>
      <Toaster position="top-center" richColors />
    </section>
  )
}

export default View_Members