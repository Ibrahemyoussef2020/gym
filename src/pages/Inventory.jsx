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
  isAllDataExits
} from "../utilities"
import { toast, Toaster } from "sonner";




const Inventory = () => {
  const cleanUpRef = useRef(false)
  const uploadRef = useRef(null)
  const imgRef = useRef(null)

  const {data:equipmentQueryData,refetch} = useQuery(['equipments'],()=> getData('equipments'))
  
  const [mode,setMode] = useState('add')
  const [searchValue,setSearchValue] = useState('search')
  const [selectedNumber,setSelectedNumber] = useState('10')
  const [dividedQueryData,setDividedQueryData] = useState([]) 
  
  const [isPopupFormOpen,setIsPopupFormOpen] = useState(false)

  const [targetId,setTargetId] = useState('')
  const [textError , setTextError] = useState('')
  const [equipment,setEquipment] = useState({
    name:'',
    total:'',
    status:'',
    img:''
  })


  useEffect(_=>{
    let itemsShowen;
    if (cleanUpRef.current === false) {
       itemsShowen = showItems(searchValue,selectedNumber,equipmentQueryData)
  
      setDividedQueryData(divideData(itemsShowen))
    }
    return async _=>{
      if (itemsShowen?.length) {
        await refetch()
      }
    }
  },[searchValue,selectedNumber,equipmentQueryData])

 //--------------------  start methods for both mode ---------------//

 const clearPopupForm = ()=>{
  const emptyValues = {
    name:'',
    total:'',
    status:'',
    img:''
  }
  setEquipment(emptyValues)
  setIsPopupFormOpen(false)
}

  const handleUploadImage = e =>{

    const src = URL.createObjectURL(e.target.files[0]);

    const imgName = e.target.files[0].name  
    imgRef.current.src = src;

    const newObject = {
      ...equipment,
      img: `${src}` 
    }
    setEquipment(newObject)
    setTextError('')
  }


  const handleChangeValues = e =>{
    const {name,value} = e.target;
    const newObject  = {
      ...equipment,
      [name]:value
    }
    setEquipment(newObject)
    setTextError('')
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    if (equipment.status !== 'active' && equipment.status !== 'inActive') {
      setTextError('plz enter the write status active OR inActive');

      const equipmentWithoutStatus = {
        ...equipment,
        status:''
      }
      setEquipment(equipmentWithoutStatus)
      return false
    }

    if (mode === 'edite' && targetId !== '') {
      handleSubmitModifications() 
    }
    else{
      handleSubmitAdditions()
    }
  }

 //--------------------  end methods for both mode ---------------//

//-------------------  start add mode  -------------------//

const {mutate: addMutate} = useCostumMutation(addData,['equipments']) 

const showAdditionForm = _=>{
  setIsPopupFormOpen(true)
  setMode('add')
}

const handleAddequipmentQuery =  _=> {
    
  const id = crypto.randomUUID();
    const addedequipment = {
      id:id,
      ...equipment,  
    }
    addMutate({seletedData:'equipments',...addedequipment})
} 


function handleSubmitAdditions(){

    const inputsValues = {
      name:equipment.name,
      status:equipment.status,
      total:equipment.total
    }

    if (!isAllDataExits(inputsValues)) {
       setTextError('You must fill all inputs!')
       return false
    }
    if (equipment.img === '') {
      setTextError('plz upload the equipment image')
      return false
    }
    handleAddequipmentQuery()
    clearPopupForm()
    toast.success('New Equipment has added')
    return true
}


//--------------------   start modify mode   ---------------// 


const {mutate: modifyMutate} = useCostumMutation(modifyData,['equipments']) 


  const showModificationForm = (id)=>{
    const selectedItem = equipmentQueryData.filter(query => query.id === id)
    
    setEquipment({
      ...selectedItem[0]
    })
    setTargetId(id)
    setIsPopupFormOpen(true)
    setMode('edite')
  }

  const handleModifyequipmentQuery = () => {
      const modifiedequipment = {
        ...equipment
      }

       modifyMutate({seletedData:'equipments',targetId,...modifiedequipment})
  } 

  function handleSubmitModifications(){
    handleModifyequipmentQuery()
    clearPopupForm()
    toast.warning('Admin iformations have updated')
    return true
  }

//--------------------      end modify mode     ---------------//



//----------------  start search and select number method -----------//

  const handleSearch = (e)=>{
    e.preventDefault() ; 
    showItems(searchValue,selectedNumber,equipmentQueryData)
  }

//----------------  end search and select number method -----------//

  return (
    <section className="relative pl-4 pt-[20px]">
      <button onClick={showAdditionForm} className=" font-bold text-costum-clr_dark_blue text-[20px] py-[1px] px-5 rounded-3xl bg-white mb-[31px] mt-5 altr-shadow">
        Add equipment
      </button>

    <form onSubmit={handleSubmit} action="#" className={`min-w-[620px] min-h-[354px] flex flex-wrap items-start gap-x-4  popup pt-[21px] pb-[30px] px-[34px] absolute top-[200px] -left-2 z-50 bg-white rounded-2xl ${ isPopupFormOpen ?  'block' : 'hidden'} main-shadow`}>
        <div className="w-full flex justify-between">
            <article>
              <h3 className="font-bold text-costum-clr_dark_blue text-[20px] bg-white mb-1">
                Add equipment
              </h3>
              <label htmlFor="img" className=" cursor-pointer">
                <span className=" text-costum-clr_medium_blue mr-1">Attach Photo</span>
                <i className="fa-regular fa-pen-to-square mr-1 text-costum-clr_dark_blue"></i>
                <input type="file" accept="image/jpg image/png" onChange={handleUploadImage} id="img" name="img" className=" hidden"/>
              </label>
            </article>

            <div className="w-[110px] h-[110px] rounded-xl p-1 flex items-center justify-center">
              <img ref={imgRef} src={mode === 'add' ? "/images/equipments/init-equipment-image.png" : equipment.img} alt="" className="w-[100%] h-[100%]" />
            </div>
        </div>
        <label htmlFor="name" className="flex-1 min-w-[100%] mb-2">
          <p className="font-bold pb-1 text-costum-clr_dark_blue">Equipment Name</p>
          <input value={equipment.name} onChange={handleChangeValues} id="name" name="name" type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>             
        <label htmlFor="email" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1 text-costum-clr_dark_blue">Status</p>
          <input value={equipment.status} autoComplete='inActive' placeholder="write active or inActive" onChange={handleChangeValues} id="status" name="status"  type="text" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <label htmlFor="concat" className="flex-1 min-w-[45%]">
          <p className="font-bold pb-1 text-costum-clr_dark_blue">Total No.</p>
          <input value={equipment.total} onChange={handleChangeValues} id="total" name="total" type="number" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
        </label>
        <p className={`text-error mb-2 text-red-500 text-sm mt-2 w-full bg-white ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
        <div className="flex gap-x-3 w-full justify-end">
          <button name="clear" type="button" onClick={clearPopupForm} className="font-bold py-[2px] px-5 rounded-xl text-costum-clr_dark_blue border border-solid border-costum-clr_dark_blue">Cancel</button>
          <button type="submit" name="submit" className="font-bold py-1 px-4 rounded-xl text-costum-clr_dark_blue  bg-[#DEBA3B]">Save Changes</button>
        </div>
      </form>


      <div className="py-[20px] px-[30px] rounded-2xl h-[500px] bg-[#77749B] relative z-0 text-white altr-shadow">
       <div>
          <h2 className=" text-[20px] font-bold mb-4">Gym equipment</h2>
          <div className="flex justify-between mb-8">
            <form className="flex items-center gap-x-2">
              <span className=" text-[12px]">Show Entities</span>
              <select onChange={e=> {setSelectedNumber(e.target.value) ; cleanUpRef.current = false}} name="show-num-equipment" id="show-num-equipment" className="py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none">
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
              <input onChange={e=>{setSearchValue(e.target.value) ; cleanUpRef.current = false}} type="text" name="serch-equipment" id="serch-equipment" value={searchValue} placeholder="Search" className="w-[151px] py-[1px] px-3 bg-[#5D57A3] rounded-2xl outline-none" />
              <button onClick={e=>handleSearch(e)}>
                <i className="fa-solid fa-magnifying-glass text-3xl font-semibold"></i>
              </button>
            </form>
          </div>
       </div>
       <ul className="flex justify-center mb-[18px]">
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Equipment Name</span>
          </li>
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Total No.</span>
          </li>
          <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-[14px] font-bold">Status</span>
          </li>
          <li>
            <span className=" whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-bold">Actions</span>
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
                      <li className="flex-1 pl-4 whitespace-nowrap overflow-hidden text-ellipsis">{item.total}</li>
                      <li className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.status}</li>
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

export default Inventory