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
  showItemsBetweenDates
} from "../utilities"




const Report = () => {
  let location = useLocation();
  const cleanUpRef = useRef(false)
  const stopRerender = useRef(false)

  const {data:paymentsQueryData,refetch} = useQuery(['payments'],()=> getData('payments'))
  
  const [searchValue,setSearchValue] = useState('search')
  const [selectedNumber,setSelectedNumber] = useState('10')
  const [selectedDates , setSelectedDates] = useState([])
  const [dividedQueryData,setDividedQueryData] = useState([]) 
  
  const [textError , setTextError] = useState('')
  const [textDateError , setTextDateError] = useState('')

  const [amount,setAmount] = useState('')
  const [payment,setPayment] = useState({
    fromDate:'',
    toDate:''
  })


  useEffect(_=>{
    let itemsShowen;

     if (stopRerender.current === false && !dividedQueryData.length || payment.fromDate === '' || payment.fromDate === '') {
        itemsShowen = showItemsBetweenDates(payment.fromDate,payment.toDate,searchValue,selectedNumber,paymentsQueryData,dividedQueryData)
        setDividedQueryData(divideData(itemsShowen.newList))
     }
    return async _=>{
      if (itemsShowen?.length) {   
        await refetch()
      }
      setTimeout(_=> stopRerender.current = true , 200 )
    }
  },[searchValue,selectedNumber,paymentsQueryData,dividedQueryData.length,payment.fromDate,payment.toDate])

  
  const handleAllDataFilters = (e)=>{
    const {name,value} = e.target;
    const modifiedpayment  = {
      ...payment,
      [name]:value
    }
    setPayment(modifiedpayment)

    let firstDate = '';
    let lastDate = '';
    let fromDateTime = '';
    let toDateTime = '';

    if (name === 'search-payments') {
      setSearchValue(value)
    }

    if (name === 'show-num-payments') {
      setSelectedNumber(value)
    }

    if (modifiedpayment.fromDate !== '' && modifiedpayment.toDate !== ''){      
        firstDate = new Date(modifiedpayment.fromDate)
        lastDate = new Date(modifiedpayment.toDate)

        fromDateTime =  firstDate.getTime();
        toDateTime   =   lastDate.getTime();
    }

    const paymentsWithinDuration = showItemsBetweenDates(fromDateTime,toDateTime,searchValue,selectedNumber,paymentsQueryData)
    setAmount(paymentsWithinDuration.amountList)
    setDividedQueryData(divideData(paymentsWithinDuration.newList))
    setTimeout(()=> refetch(),100) 

  }

  return (
    <section className="realative  overflow-hidden pt-[40px]">

    <h1 className=" text-[32px] font-bold  text-costum-clr_dark_blue mt-[15px] mb-[10px]">Sales Report</h1>

      <div className="mb-[42px] pt-[25px] pb-[49px] px-[30px] rounded-2xl h-[110px]  min-w-[597px] bg-[#fff] relative z-0 text-[#2B2B2B] altr-shadow">
        <form className="flex items-center gap-x-8">
          <label htmlFor="fromDate" className="flex-1 max-w-[173px]">
            <p className="font-bold pb-3">From Date</p>
            <input onChange={handleAllDataFilters} id="fromDate" name="fromDate" type="date" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
          <label htmlFor="toDate" className="flex-1 max-w-[173px]">
            <p className="font-bold pb-3">To Date</p>
            <input onChange={handleAllDataFilters} id="toDate" name="toDate" type="date" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
          <div className="flex-1 text-end">
            <h2 className="font-bold pb-1 text-md">Total</h2>
            <p className="font-bold pb-1 min-h-[30px]">{amount}</p>
          </div>
        </form>
      </div>

      <div className="py-[20px] px-[30px] rounded-2xl h-[500px]  min-w-[611px] bg-[#fff] relative z-0 text-costum-clr_dark_blue altr-shadow">
       <div>
          <h2 className=" text-[20px] font-bold mb-4">Gym payments</h2>
          <div className="flex justify-between mb-8">
            <form className="flex items-center gap-x-2">
              <span className=" text-[12px]">Show Entities</span>
              <select onChange={handleAllDataFilters} name="show-num-payments" id="show-num-payments" className="py-[1px] px-3 bg-[#5D57A3] text-white rounded-2xl outline-none">
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
              <input onChange={handleAllDataFilters} type="text" name="search-payments" id="search-payments" value={searchValue} placeholder="Search" className="w-[151px] py-[1px] px-3 bg-[#5D57A3] text-white rounded-2xl outline-none" />
              <button onClick={handleAllDataFilters} disabled>
                <i className="fa-solid fa-magnifying-glass text-3xl font-semibold"></i>
              </button>
            </form>
          </div>
       </div>
       <ul className="flex justify-between mb-[18px]">
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Member Name</span>
          </li>
          <li className="flex-1 pl-7 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className=" text-[14px] font-bold">Member ID</span>
          </li>
          <li className="flex-1 pl-[70px] whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Plan</span>
          </li>
          <li className="flex-1 pl-2 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Month</span>
          </li>
          <li className="flex-1 pl-7 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Date Paid</span>
          </li>
          <li className="ml-4">
            <span className="w-[40px] whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-bold">Amount</span>
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
      dividedQueryData?.length ?  

      dividedQueryData?.map(page  => {
            return (
              <SwiperSlide
                key={Math.random() + '' + new Date()}                     
              >
                {
                  page?.map(item => {
            
                    return <ul key={item.id} className="flex text-[12px] mb-4 py-3">
                      <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item?.id?.slice(0,10)}</li>
                      <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.plan}-Mounths</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.month}</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.date}</li>
                      <li>
                        {item.price}
                      </li>
                    </ul>
                  })
                }
            </SwiperSlide>
            )
          })      
        : null}   
      </Swiper>
      </div>
    </section>
  )
}

export default Report