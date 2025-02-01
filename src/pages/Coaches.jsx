import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useRef, useState } from "react"
import { useNavigate,useLocation } from "react-router";
import { useQuery } from "react-query";
import {modifyData,addData,getData} from '../api'

import { 
  useCostumMutation,
  showItems,
  divideData,
  selectDateToMonth,
  isAllDataExits,
  sortItems
} from "../utilities"
import { toast, Toaster } from "sonner";




const Coaches = () => {
  const cleanUpRef = useRef(false)

  const {data:coachQueryData,refetch} = useQuery(['coaches'],()=> getData('coaches'))
  
  const [mode,setMode] = useState('add')
  const [searchValue,setSearchValue] = useState('search')
  const [selectedNumber,setSelectedNumber] = useState('10')
  const [dividedQueryData,setDividedQueryData] = useState([]) 
  
  const [isPopupFormOpen,setIsPopupFormOpen] = useState(false)
  const [ isDataShowenReverse,setIsDataShowenReverse]=useState(true)

  const [targetId,setTargetId] = useState('')
  const [textError , setTextError] = useState('')
  const [coach,setCoach] = useState({
    name:'',
    date:'',
    email:'',
    concat:'',
    'date-enrolled':'',
    'date-expiration':'',
  })
  const [controlledCoachInfo,setControlledCoachInfo] = useState({
    name:'',
    date:'',
    email:'',
    concat:'',
  })


  useEffect(_=>{
    let itemsShowen;
    if (cleanUpRef.current === false) {
       itemsShowen = showItems(searchValue,selectedNumber,coachQueryData)
  
      setDividedQueryData(divideData(itemsShowen))
    }
    return async _=>{
      if (itemsShowen?.length) {
        await refetch()
      }
    }
  },[searchValue,selectedNumber,coachQueryData])

 //--------------------  start methods for both mode ---------------//

 const clearPopupForm = ()=>{
  const emptyValues = {
    name:'',
    date:'',
    email:'',
    concat:'',
    'date-enrolled':'',
    'date-expiration':'',
  }
  const emptyControlledValues = {
    name:'',
    date:'',
    email:'',
    concat:'',
  }
  setCoach(emptyValues)
  setControlledCoachInfo(emptyControlledValues)
  setIsPopupFormOpen(false)
}


  const handleChangeValues = e =>{
    const {name,value} = e.target;
    const newObject  = {
      ...coach,
      [name]:value
    }

    const newControlledObject  = {
      ...controlledCoachInfo,
      [name]:value
    }

    setCoach(newObject)
    setControlledCoachInfo(newControlledObject)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    if (mode === 'edite' && targetId !== '') {
      handleSubmitModifications() 
    }
    else{
      handleSubmitAdditions()
    }
  }

 //--------------------  end methods for both mode ---------------//

//-------------------  start add mode  -------------------//

const {mutate: addMutate} = useCostumMutation(addData,['coaches']) 

const showAdditionForm = _=>{
  setIsPopupFormOpen(true)
  setMode('add')
}

const handleAddCoachQuery =  _=> {
    
  const id = crypto.randomUUID();
  const subuscriptionLimitation = selectDateToMonth(coach.date,'5')
    const addedCoach = {
      id:id,
      ...coach,
      'date-enrolled':subuscriptionLimitation.startDate,
      'date-expiration':subuscriptionLimitation.endDate,
      
    }
    addMutate({seletedData:'coaches',...addedCoach})
} 


function handleSubmitAdditions(){ 

    if (!isAllDataExits(controlledCoachInfo)) {
       setTextError('You must fill all inputs!')
       return false
    }
    handleAddCoachQuery()
    clearPopupForm()
    toast.success('New coach has added')
    return true
}


//--------------------   start modify mode   ---------------// 


const {mutate: modifyMutate} = useCostumMutation(modifyData,['coaches']) 


  const showModificationForm = (id)=>{
    const selectedItem = coachQueryData.filter(query => query.id === id)
    
    setCoach({
      ...selectedItem[0]
    })
    setTargetId(id)
    setIsPopupFormOpen(true)
    setMode('edite')
  }

  const handleModifyCoachQuery = () => {
      const modifiedcoach = {
        ...coach
      }
      
       modifyMutate({seletedData:'coaches',targetId,...modifiedcoach})
  } 

  function handleSubmitModifications(){
    handleModifyCoachQuery()
    clearPopupForm()
    toast.warning('Coach iformations have updated')
    return true
  }

//--------------------      end modify mode     ---------------//



//----------------  start search and select number and sort method -----------//

  const handleSearch = (e)=>{
    e.preventDefault() ; 
    showItems(searchValue,coachQueryData)
    cleanUpRef.current = false ;
  }

  const handleSort = e=>{
    e.preventDefault()
    setIsDataShowenReverse(!isDataShowenReverse)

   const itemsShowen = showItems(searchValue,selectedNumber,coachQueryData)
  
   const sortedImes = sortItems(itemsShowen,isDataShowenReverse)

   setDividedQueryData(divideData(sortedImes))
  }

//----------------  end search and select number method -----------//

  return (
    <section className="realative  mt-[45px]">
      <h1 className=" text-[32px] font-bold  text-costum-clr_dark_blue mt-[5px] mb-[10px]">Active Coaches</h1>

      <button onClick={showAdditionForm} className=" font-bold text-costum-clr_dark_blue text-[20px] py-[1px] px-6 rounded-2xl bg-white mb-4 altr-shadow">
        Add Coach
      </button>

    <form onSubmit={handleSubmit} action="#" className={`w-[623px] h-[354px] flex flex-wrap items-start gap-x-4 gap-y-4  popup  py-[30px] px-[34px] absolute z-50 bg-white rounded-2xl ${ isPopupFormOpen ?  'block' : 'hidden'} main-shadow`}>
        <label htmlFor="name" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Name of Participant</p>
          <input value={coach.name} onChange={handleChangeValues} id="name" name="name" type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="date" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Date of Join</p>
          <input value={coach.date} onChange={handleChangeValues} id="date" name="date" type="date" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="email" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Email Address</p>
          <input value={coach.email} onChange={handleChangeValues} id="email" name="email"  type="email" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="concat" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Contact No.</p>
          <input value={coach.concat} onChange={handleChangeValues} id="concat" name="concat" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <div className="flex gap-x-3 w-full justify-end">
          <button type="submit" name="submit" className="font-bold py-1 px-4 rounded-xl text-white bg-costum-clr_dark_blue">{mode[0].toUpperCase()}{mode.slice(1)} Coach</button>
          <button name="clear" type="button" onClick={clearPopupForm} className="font-bold py-1 px-4 rounded-xl text-costum-clr_dark_blue border border-solid border-costum-clr_dark_blue">Cancel</button>
        </div>
        <p className={`text-error mb-2 text-red-500 text-sm mt-2 bg-white ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
      </form>


      <div className="py-[20px] px-[30px] rounded-2xl h-[500px] bg-[#77749B] relative z-0 text-white altr-shadow">
       <div>
          <h2 className=" text-[20px] font-bold mb-4">Gym coach</h2>
          <div className="flex justify-between mb-8">
            <form className="flex items-center gap-x-2">
              <span className=" text-[12px]">Show Entities</span>
              <select onChange={e=> {setSelectedNumber(e.target.value) ; cleanUpRef.current = false}} name="show-num-coach" id="show-num-coach" className="py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none">
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
              <input onChange={e=>{setSearchValue(e.target.value) ; cleanUpRef.current = false}} type="text" name="serch-coach" id="serch-coach" value={searchValue} placeholder="Search" className="w-[151px] py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none" />
              <button onClick={e=>handleSearch(e)}>
                <i className="fa-solid fa-magnifying-glass text-3xl font-semibold"></i>
              </button>
            </form>
          </div>
       </div>
       <ul className="flex justify-between mb-[18px] py-3">
          <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <button onClick={handleSort}>
              <i className="fa-solid fa-arrow-down-up-across-line text-[#ccc] mr-1"></i>
            </button>
            <span className="text-[14px] font-bold">Name</span>
          </li>
          <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className=" text-[14px] font-bold">Coach ID</span>
          </li>
          <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Contact</span>
          </li>
          <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
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
                      <li className="  flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</li>
                      <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.id.slice(0,10)}</li>
                      <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item['date-enrolled']}</li>
                      <li className=" flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item['date-expiration']}</li>
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

export default Coaches