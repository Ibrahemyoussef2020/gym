import { useState } from "react"
import {addData,getData} from '../api' 
import { 
  useCostumMutation,
  isAllDataExits ,
  selectMonthInEnglish
} from "../utilities"
import { useNavigate } from "react-router"

const Payment = () => {
  const [textError , setTextError] = useState('')

  const [payment,setPayment] = useState({
      name:'',
      plan:'',
      price:0,
      date:'',
      month:''
  })
  const navigate = useNavigate()
  const {mutate: addMutate} = useCostumMutation(addData,['payments']) 


  const handleAddPaymentQuery =  _=> {
    
    const id = crypto.randomUUID();
    const month = selectMonthInEnglish(payment.date)
      const addedPayment = {
        id:id,
        ...payment,
        month
      }
       addMutate({seletedData:'payments',...addedPayment})
  } 

  const clearPaymentValues = ()=>{
    const emptyValues = {
      name:'',
      plan:'',
      price:0,
      date:'',
      month:''
    }
    setPayment(emptyValues)
  }


  const handleSubmit = e =>{
    e.preventDefault();

    const paymentWithoutMonth = {
      name:payment.name,
      plan:payment.plan,
      price:payment.price,
      date:payment.date,
    }

    if (!isAllDataExits(paymentWithoutMonth)) {
       setTextError('You must fill all inputs!')
       return false
    }
    handleAddPaymentQuery()
    clearPaymentValues()
    navigate('/dashboard-layout/report')
    return true
  }

  const handleChangeValues = e =>{
    const {name,value} = e.target;
    const addedPayment  = {
      ...payment,
      [name]:value
    }
    setPayment(addedPayment)
  }

  return (
    <section className="mt-9">
      <p className=" text-[32px] font-bold mb-1 p-0 text-[#DEBA3B]">Point of Sale</p>
      <h1 className="text-[40px] leading-4 font-semibold mt-0 mb-7 p-0 text-[#1A1363]">Add Payment</h1>
      <form onSubmit={handleSubmit} action="#" className="w-[623px] min-h-[255px] flex flex-wrap items-start gap-x-4 gap-y-4  px-[25px] py-[17px] bg-white rounded-xl main-shadow">
        <label htmlFor="name" className="flex-1 min-w-[50%]">
          <p className="font-bold pb-1">Name of Member</p>
          <input onChange={e=> handleChangeValues(e)} id="name" name="name" type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <div className="flex flex-1 gap-x-2 min-w-[45%]">
          <label htmlFor="plan" className="flex-1">
            <p className="font-bold pb-1">Plan</p>
            <input onChange={e=> handleChangeValues(e)} id="plan" name="plan" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
          <label htmlFor="price" className="flex-1">
            <p className="font-bold pb-1">Price</p>
            <input onChange={e=> handleChangeValues(e)} id="price" name="price" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
          </label>
        </div>
        <label htmlFor="date" className="flex-1 max-w-[40%]">
          <p className="font-bold pb-1">Date of Join</p>
          <input onChange={e => handleChangeValues(e)} id="date" name="date" type="date" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>     
        <div className="flex gap-x-3 w-full justify-end">
          <button type="submit" name="submit" className="font-bold py-1 px-5 rounded-2xl text-white bg-costum-clr_dark_blue">Save</button>
          <button name="clear" className="font-bold py-1 px-4 rounded-2xl text-costum-clr_dark_blue border border-solid border-costum-clr_dark_blue">Cancel</button>
        </div>
      </form>
      <p className={`text-error text-red-500 text-sm mt-2 bg-white ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
    </section>
  )
}

export default Payment