import { useState } from "react"
import {addData,getData} from '../api'
import { 
  useCostumMutation,
  isAllDataExits ,
  selectDateToMonth,
  
} from "../utilities"
import { useNavigate } from "react-router"

import { toast, Toaster } from "sonner";

const Registration = () => {
  const [textError , setTextError] = useState('')

  const [register,setRegister] = useState({
      name:'',
      date:null,
      email:'',
      concat:'',
      plan:'',
      price:0,
  })
  const navigate = useNavigate()
  const {mutate: addMutate} = useCostumMutation(addData,['members']) 


  const handleAddMemerQuery =  _=> {
    
    const id = crypto.randomUUID();
    const subuscriptionLimitation = selectDateToMonth(register.date,register.plan)
      const addedRegister = {
        id:id,
        'date-enrolled':subuscriptionLimitation.startDate,
        'date-expiration':subuscriptionLimitation.endDate,
        ...register
      }
       addMutate({seletedData:'members',...addedRegister})
  } 


  const handleSubmit = e =>{
    e.preventDefault();
    if (!isAllDataExits(register)) {
       setTextError('You must fill all inputs!')
       return false
    }
    handleAddMemerQuery()
     toast.success('New Member has added')
    navigate('/dashboard-layout/view-members')
    return true
  }

  const handleChangeValues = e =>{
    const {name,value} = e.target;
    const addedRegister  = {
      ...register,
      [name]:value
    }
    setRegister(addedRegister)
  }

  return (
    <section className="pt-[70px]">
      <p className=" text-[32px] font-bold mb-1 p-0 text-[#DEBA3B]">Become a Member!</p>
      <h1 className="text-[40px] leading-4 font-semibold mt-0 mb-6 p-0 text-[#1A1363]">Register</h1>
      <form onSubmit={handleSubmit} action="#" className="w-[623px] h-[354px] flex flex-wrap items-start gap-x-4 gap-y-4  px-[25px] pt-[40px] pb-[16px] bg-white rounded-xl main-shadow">
        <label htmlFor="name" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Name of Participant</p>
          <input onChange={e=> handleChangeValues(e)} id="name" name="name" type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="join-date" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Date of Join</p>
          <input onChange={e => handleChangeValues(e)} id="date" name="date" type="date" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="email" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Email Address</p>
          <input onChange={e=> handleChangeValues(e)} id="email" name="email"  type="email" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="concat" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Contact No.</p>
          <input onChange={e=> handleChangeValues(e)} id="concat" name="concat" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <div className="flex flex-1 gap-x-2 max-w-[50%]">
          <label htmlFor="plan" className="flex-1">
            <p className="font-bold pb-1">Plan</p>
            <input onChange={e=> handleChangeValues(e)} id="plan" name="plan" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
          <label htmlFor="price" className="flex-1">
            <p className="font-bold pb-1">Price</p>
            <input onChange={e=> handleChangeValues(e)} id="price" name="price" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
        </div>
        <div className="flex gap-x-3 w-full justify-end">
          <button type="submit" name="submit" className="font-bold py-1 px-4 rounded-xl text-white bg-costum-clr_dark_blue">Avail Membership</button>
          <button name="clear" className="font-bold py-[2px] px-4 rounded-xl text-costum-clr_dark_blue border-2 border-solid border-costum-clr_dark_blue">Cancel</button>
        </div>
      </form>
      <p className={`text-error text-red-500 text-sm mt-2 bg-white ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
      <Toaster position="top-center" richColors />
    </section>
  )
}

export default Registration