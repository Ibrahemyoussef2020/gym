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
  isAllDataExits
} from "../utilities"




const Plan = () => {
  const cleanUpRef = useRef(false)

  const {data:plansQueryData,refetch} = useQuery(['plans'],()=> getData('plans'))
  
  const [mode,setMode] = useState('add')
  const [searchValue,setSearchValue] = useState('search')
  const [selectedNumber,setSelectedNumber] = useState('10')
  const [dividedQueryData,setDividedQueryData] = useState([]) 
  
  const [targetId,setTargetId] = useState('')
  const [textError , setTextError] = useState('')
  const [plan,setPlan] = useState({
    name:'',
    validity:'',
    price:'',
    created:''
  })


  useEffect(_=>{
    let itemsShowen;
    if (cleanUpRef.current === false) {
       itemsShowen = showItems(searchValue,selectedNumber,plansQueryData)
  
      setDividedQueryData(divideData(itemsShowen))
    }
    return async _=>{
      if (itemsShowen?.length) {
        await refetch()
      }
    }
  },[searchValue,selectedNumber,plansQueryData])

 //--------------------  start methods for both mode ---------------//

 const clearPopupForm = ()=>{
  const emptyValues = {
    name:'',
    validity:'',
    price:'',
    created:''
  }
  setPlan(emptyValues)
}


  const handleChangeValues = e =>{
    const {name,value} = e.target;
    const newObject  = {
      ...plan,
      [name]:value
    }
    setPlan(newObject)
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

const {mutate: addMutate} = useCostumMutation(addData,['plans']) 

const showAdditionForm = _=>{
  setMode('add')
}

const handleAddPlansQuery =  _=> {
    
  const id = crypto.randomUUID();
    const addedplan = {
      id:id,
      ...plan,
      created:new Date()
    }
    addMutate({seletedData:'plans',...addedplan})
} 


function handleSubmitAdditions(){

    const planWithoutCreatedProp = {
      name:plan.name,
      validity:plan.validity,
      prcie:plan.price
    }
  
    if (!isAllDataExits(planWithoutCreatedProp)) {
       setTextError('You must fill all inputs!')
       return false
    }
    handleAddPlansQuery()
    clearPopupForm()
    return true
}


//--------------------   start modify mode   ---------------// 


const {mutate: modifyMutate} = useCostumMutation(modifyData,['plans']) 


  const showModificationForm = (id)=>{
    const selectedItem = plansQueryData.filter(query => query.id === id)
    
    setPlan({
      ...selectedItem[0]
    })
    setTargetId(id)
    setMode('edite')
  }

  const handleModifyplansQuery = () => {
      const modifiedplans = {
        ...plan
      }

       modifyMutate({seletedData:'plans',targetId,...modifiedplans})
  } 

  function handleSubmitModifications(){
    handleModifyplansQuery()
    clearPopupForm()
    return true
  }

//--------------------      end modify mode     ---------------//



//----------------  start search and select number method -----------//

  const handleSearch = (e)=>{
    e.preventDefault() ; 
    showItems(searchValue,plansQueryData)
  }

//----------------  end search and select number method -----------//

  return (
    <section className="realative lg:max-w-[650px] overflow-hidden p-1 pt-[55px]">
      
      <button onClick={showAdditionForm} className=" font-bold text-costum-clr_dark_blue text-[20px] py-[1px] px-5 rounded-2xl bg-white mb-3 altr-shadow">
        Add Plan
      </button>

    <form onSubmit={handleSubmit} action="#" className={`w-[615px] max-h-[288px] mb-[30px] gap-y-4 flex flex-wrap items-start gap-x-4 pt-[23px]  px-[27px] bg-costum-clr_medium_blue text-white rounded-2xl main-shadow`}>
        <label htmlFor="name" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Plan Name</p>
          <input value={plan.name} onChange={handleChangeValues} id="name" name="name" type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="date" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1">Validity</p>
          <input value={plan.validity} onChange={handleChangeValues} id="validity" name="validity" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="price" className="flex-1 max-w-[50%] mb-2">
          <p className="font-bold pb-1">Amount</p>
          <input value={plan.price} onChange={handleChangeValues} id="price" name="price"  type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <div className="flex gap-x-3 w-full justify-end mt-2">
          <button type="submit" name="submit" className="font-bold py-1 px-4 rounded-xl bg-[#DEBA3B] text-costum-clr_dark_blue">Save</button>
          <button name="clear" type="button" onClick={clearPopupForm} className="py-1 px-4 rounded-xl text-costum-clr_dark_blue border border-solid border-costum-clr_dark_blue bg-white">Cancel</button>
        </div>
        <p className={`text-error mb-2 text-red-500 text-sm mt-2 bg-inherit ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
      </form>


      <div className="py-[16px] px-[18px] rounded-2xl max-h-[362px] w-[620px] bg-[#77749B] relative z-0 text-white altr-shadow">
       <div>
          <div className="flex justify-between mb-4">
            <form className="flex items-center gap-x-2">
              <span className=" text-[12px]">Show Entities</span>
              <select onChange={e=> {setSelectedNumber(e.target.value) ; cleanUpRef.current = false}} name="show-num-plans" id="show-num-plans" className="py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none">
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
              <input onChange={e=>setSearchValue(e.target.value)} type="text" name="serch-plans" id="serch-plans" value={searchValue} placeholder="Search" className="w-[151px] py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none" />
              <button onClick={e=>handleSearch(e)}>
                <i className="fa-solid fa-magnifying-glass text-3xl font-semibold"></i>
              </button>
            </form>
          </div>
       </div>
       <ul className="flex w-full justify-between mb-[18px]">
          <li className="whitespace-nowrap w-[171px]  overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Plan Name</span>
          </li>
          <li className="whitespace-nowrap  w-[171px] overflow-hidden text-ellipsis">
            <span className=" text-[14px] font-bold">Validity</span>
          </li>
          <li className="whitespace-nowrap w-[171px]  overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Amount</span>
          </li>
          <li className="whitespace-nowrap w-[46px]  overflow-hidden text-ellipsis pr-2">
            <span className="text-[14px] font-bold">Edit</span>
          </li>
        </ul> 
       <Swiper
        loop={true}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="h-[292px]"
      >
        
        {
       
          dividedQueryData?.map(page  => {
            return (
              <SwiperSlide
                key={Math.random() + '' + new Date()}                     
              >
                {
                  page?.map(item => {
            
                    return <ul key={item.id} className="flex w-full justify-between text-[12px] mb-[16px]">
                      <li className="whitespace-nowrap w-[171px] overflow-hidden text-ellipsis">{item.name || '...'}</li>
                      <li className="whitespace-nowrap w-[171px] pl-6 overflow-hidden text-ellipsis">{item.validity || '...'}</li>
                      <li className="whitespace-nowrap w-[171px] pl-6 overflow-hidden text-ellipsis">{item.price || '...'}</li>
                      <li className="w-[46px]">
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
    </section>
  )
}

export default Plan