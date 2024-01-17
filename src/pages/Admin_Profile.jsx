import React ,{useState} from "react"
import {useQuery,useMutation , useQueryClient} from 'react-query'
import { useNavigate } from "react-router"
import {
addData,
modifyData,
getData
} from '../api'

import { 
  
  useCostumMutation,

  passwordValidation,
  arePasswordsIdentical,
  arePasswordsDifferent,

  isAllDataExits 


} from "../utilities"




const Admin_Profile = () => {


  const [doesMainDataCopmleteInAddMode,setDoesMainDataCopmleteInAddMode] = useState(false)
  const [textContactError,setTextContactError] = useState('')
  const [textPasswordError,setTextPasswordError] = useState('')

  const [mode , setMode] = useState('add')
  const [admin,setAdmin] = useState({
    name:'',
    contact:'',
    email:'',
  })

  const [adminPasswordData , setAdminPasswordData ] = useState({
    oldPassword:'',
    password:'',
    reTyepPassword:'',
  })

  const [isAdminsVisible,setIsAdminsVisible] = useState(false)


  const {data:adminQueryData} = useQuery(['admins'],()=> getData('admins'))

// ----------------- start handle add mode -------------//

 
const {mutate: addMutate} = useCostumMutation(addData,['admins']) 

const moveToAddMode = _=>{

  const editeModeData = {
      name:'',
      contact:'',
      email:'',
  } 
  const editeModePasswordData = {
    password:'',
    oldPassword:'',
    reTyepPassword:''
  }

  setMode('add')
  setAdmin(editeModeData)
  setAdminPasswordData(editeModePasswordData)
  setTextContactError('')
  setTextPasswordError('')
  setDoesMainDataCopmleteInAddMode(false)
}

// handle add query

const handleAddAdminQuery =  _=> {
  const id = crypto.randomUUID();
    const seletedData = 'admins';
    const {password} = adminPasswordData

    const addedAdmin = {
      id:id,
      password,
      ...admin
    }
     addMutate({seletedData:'admins',...addedAdmin})
} 


// ----------------- end handle add mode -------------//


// ----------------- start handle edite mode -------------//


const {mutate : modifyMutate } = useCostumMutation(modifyData,['admins'])

const moveToEditeMode = _=>{
  const editeModeData = {
      name:adminQueryData[0].name,
      contact:adminQueryData[0].contact,
      email:adminQueryData[0].email,
  } 

  const editeModePasswordData = {
    password:adminQueryData[0].password,
    oldPassword:adminQueryData[0].password,
    reTyepPassword:adminQueryData[0].password
  }

  setMode('edite')
  setAdmin(editeModeData)
  setAdminPasswordData(editeModePasswordData)
  setTextContactError('')
  setTextPasswordError('')
  setDoesMainDataCopmleteInAddMode(false)
}
 

// handle modify(edite) query

const handleModifyAdminQuery = e =>{

  e.preventDefault()

  const id = "Admin-Ibrahim-Youssef-123456";
    const seletedData = 'admins';
    const {password} = adminPasswordData

    const modifiedAdmin = {
      id,
      name:admin.name === '' ? adminQueryData[0].name : admin.name,
      contact:admin.contact === '' ? adminQueryData[0].contact : admin.contact,
      email:admin.email === '' ? adminQueryData[0].email : admin.email,
      password:adminPasswordData.password === '' ? adminQueryData[0].password : adminPasswordData.password,
    }

     modifyMutate({seletedData:'admins',id,...modifiedAdmin})
}

// ----------------- end handle edite mode -------------//



//--------------------   start form concat     ---------------//

const handleChangeContactValues = e =>{
  const {value,name} = e.target
    const data = {
      ...admin,
      [name] : value
    }
    setAdmin(data)
    setTextContactError('')
}


const handleClearConcatValues = e =>{
    e.preventDefault()
    const editeModeData = {
      name:'',
      contact:'',
      email:'',
    } 
    setAdmin(editeModeData)
}


const handleContactFormSubmit = e =>{
    e.preventDefault()

    if(mode === 'add'){
      setDoesMainDataCopmleteInAddMode(true)
      const adminPasswordDataInAddMode = {
        password:adminPasswordData.password,
        reTyepPassword:adminPasswordData.reTyepPassword
      }

      if (!isAllDataExits(admin) || !isAllDataExits(adminPasswordDataInAddMode)) {
        setTextPasswordError('you must fill all inputs!')
        return false
      }

      handleAddAdminQuery(e)
      handleClearPasswordsValues(e)
    }
    else if(mode === 'edite'){
      handleModifyAdminQuery(e)
    }

    handleClearConcatValues(e)

  return true
}

//--------------------   end form concat     ---------------//



//--------------------  start form password  ---------------//

const handleChangePasswordValues = e =>{
  const {value,name} = e.target
  const passwordData = {
    ...adminPasswordData,
    [name] : value
  }
  setAdminPasswordData(passwordData)
  setTextPasswordError('')
}


const handleClearPasswordsValues = e =>{
  e.preventDefault()
  const emptyValues = {
    oldPassword:'',
    password:'',
    reTyepPassword:''
  }
  setAdminPasswordData(emptyValues)
}


const handlePasswordFormSubmit = e =>{
  e.preventDefault()

  const passwordValidationObject = passwordValidation(adminPasswordData.password)
  const arePasswordsIdenticalObject = arePasswordsIdentical(adminPasswordData.password,adminPasswordData.reTyepPassword)
  const arePasswordsDifferentObject = arePasswordsDifferent(adminPasswordData.oldPassword , adminPasswordData.password)

  
  if (mode === 'add') {

    const adminPasswordDataInAddMode = {
      password:adminPasswordData.password,
      reTyepPassword:adminPasswordData.reTyepPassword
    }

      if (!doesMainDataCopmleteInAddMode) {
        setTextPasswordError('Please save the Top level data!')
        return false
      }

      if (!isAllDataExits(adminPasswordDataInAddMode) || !isAllDataExits(admin)) {
        setTextPasswordError('you must fill all inputs!')
        return false
      }

      if (!passwordValidationObject.isInputsTrue) {
        setTextPasswordError(passwordValidationObject.errors)
        return false
      }

      if (!arePasswordsIdenticalObject.isInputsTrue) {
        setTextPasswordError(arePasswordsIdenticalObject.errors)
        return false
      }

      handleAddAdminQuery(e)
      handleClearConcatValues(e)

  }else if(mode === 'edite') {

      if (!isAllDataExits(adminPasswordData)) {
        setTextPasswordError('you must fill all inputs!')
        return false
      }

      if (!adminPasswordData.password === adminQueryData[0].password) {
        setTextPasswordError('the password is wrong!')
        return false
      }

      if (!arePasswordsDifferentObject.isInputsTrue) {
          setTextPasswordError(arePasswordsDifferentObject.errors)
          return false
      }

      if (!arePasswordsIdenticalObject.isInputsTrue) {
        setTextPasswordError(arePasswordsIdenticalObject.errors)
        return false
      }

      handleModifyAdminQuery(e)
  }

  handleClearPasswordsValues(e)
  return true
}

//--------------------  end form password   ---------------//


const toggleMode = e =>{
  if (e.target.checked) {
    moveToEditeMode()
  }else{
    moveToAddMode()
  }
}



  return (
    <div className="pt-[50px]">
      <h1 className=" text-[32px] font-bold text-costum-clr_dark_blue">Admin Information</h1>

      <div className="flex gap-2">
        <div>
          <article className="card relative pt-[38px] pb-[65px] px-[24px] mb-[24px] w-[260px] bg-white rounded-xl main-shadow">
            <img src="/images/ibrahim.webp" alt="Ibrahim" className="w-[69px] h-[69px] rounded-full mx-auto mb-4" />
            <div className=" absolute top-[60px] right-[45px] z-10">
              {adminQueryData?.length > 1 ? 
                <>
                <span className=" text-sm font-medium">+{adminQueryData?.length - 1}</span>
                 <button onClick={_=>setIsAdminsVisible(!isAdminsVisible)} className="ml-1">
                  {isAdminsVisible ?
                    <i className="fa-solid fa-ban"></i> 
                    :
                    <i className="fa-regular fa-eye"></i>
                  }
                 </button> 
                </>
                :null
              }
            </div>
            <label htmlFor='change-mode' className={`update-admin flex justify-center items-center relative -mt-2 cursor-pointer ${mode === 'edite' ? 'text-costum-clr_dark_blue' : ''}`}>
              {
                mode === 'edite' ? <i className="fa-regular fa-pen-to-square mr-1 text-costum-clr_dark_blue"></i>
                : <div className="w-[15px] h-[15px] relative top-[1px] border border-solid border-black rounded-sm mr-1"></div>
    
              }
              <input name='change-mode' id="change-mode" onChange={toggleMode} type="checkbox"  className="hidden"/>
              <span className="pt-1 text-[13px]">Update Profile</span>
            </label>
            <ul className="mt-5 text-[13px] text-[#2B2B2B] font-medium">
              {
                adminQueryData?.filter((adminInfo , index) => index === 0 )
                .map(adminInfo =>{
                 return <React.Fragment key={adminInfo.id}>
                    <li className="flex justify-between mb-3">
                      <span>Username</span>
                      <span>{adminInfo?.name}</span>
                    </li>
                    <li className="flex justify-between mb-2">
                      <span>Conctat no.</span>
                      <a href="tel:01147359396">{adminInfo?.contact}</a>
                    </li>
                    <li>
                      <span className="w-full inline-block pb-2">Email Address:</span>
                      <a href="mailto:ibrahimYoussef95.12@gmail.com" target="_blank">{adminInfo?.email}</a>
                    </li>  
                  </React.Fragment>
                })
              }
            </ul>
          </article>
          <button
            onClick={moveToAddMode}
            className=" text-white text-[14px] mx-auto block  font-bold bg-costum-clr_dark_blue px-4 rounded-xl main-shadow"
          >
            Register New Admin Account
          </button>
          <div className={`${isAdminsVisible ? 'block' : 'hidden'} mt-5`}>
          {         
              adminQueryData?.slice(1).map(adminInfo =>{
               return <article key={adminInfo.id} className="mt-2 p-2 text-[13px] text-[#2B2B2B] font-medium bg-white rounded-md">
                    <p><span className=" font-bold">&</span> admin <span className=" font-bold">{adminInfo.name}</span></p> 
                </article>
              })
            }
          </div>
        </div>
        <div>
          <form onSubmit={handleContactFormSubmit} action="#" className="p-[25px] mb-4 w-[356px] bg-white rounded-xl main-shadow">
              <label htmlFor="admin-name" className="mb-1 block">
                <span className=" font-bold inline-block mb-1">Username</span>
                <input readOnly={doesMainDataCopmleteInAddMode} value={admin.name} onChange={handleChangeContactValues} type="text" name="name" className={`p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black read-only:text-[#777] font-medium w-full`}/>
              </label>
              <label htmlFor="admin-name" className="mb-1 block">
                <span className=" font-bold inline-block mb-1">Contact No.</span>
                <input readOnly={doesMainDataCopmleteInAddMode} value={admin.contact} onChange={handleChangeContactValues}  type="number" name="contact" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black read-only:text-[#777] font-medium w-full"/>
              </label> 
              <label htmlFor="admin-name" className="mb-1 block">
                <span className=" font-bold inline-block mb-1">Email Address</span>
                <input readOnly={doesMainDataCopmleteInAddMode} value={admin.email} onChange={handleChangeContactValues}  type="email" name="email" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black read-only:text-[#777] font-medium w-full"/>
              </label>
              <div className="mt-[15px] text-end">
                <button
                  type="submit"
                  className="text-white font-bold bg-costum-clr_dark_blue rounded-2xl py-1 px-6 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleClearConcatValues}         
                  className="font-bold border-2 border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue rounded-2xl py-1 px-6"
                >
                  Cancel
                </button>
              </div>   
          </form>
          <p className={`text-error mb-2 text-red-500 text-sm mt-2 bg-white ${textContactError !== '' ? 'p-2' : ''}`}>{textContactError}</p>
          <form action="#" onSubmit={handlePasswordFormSubmit} className="px-[25px] py-[17px] w-[356px] bg-white rounded-xl main-shadow">
              <label className=" text-center text-costum-clr_dark_blue font-bold block w-full mb-2">Password</label>
              {mode === 'edite' ? <label htmlFor="admin-name" className="mb-2 block">
                <span className=" font-bold inline-block mb-1">{mode === 'add' ? 'Current' : 'Old'} Password</span>
                <input value={adminPasswordData.oldPassword} onChange={handleChangePasswordValues}  type="password" name="oldPassword" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
              </label> : null}
              <label htmlFor="admin-name" className="mb-2 block">
                <span className=" font-bold inline-block mb-1">New Password</span>
                <input value={adminPasswordData.password} onChange={handleChangePasswordValues}  type="password" name="password" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
              </label> 
              <label htmlFor="admin-name" className="mb-2 block">
                <span className=" font-bold inline-block mb-1">Re-type Password</span>
                <input value={adminPasswordData.reTyepPassword} onChange={handleChangePasswordValues}  type="password" name="reTyepPassword" className="p-2 bg-costum-clr_dark_white outline-none rounded-xl text-sm text-costum-clr_medium_black font-medium w-full"/>
              </label>
              <div className="mt-[15px] text-end">
                <button
                  type="submit"
                  className=" text-white font-bold bg-costum-clr_dark_blue rounded-2xl py-1 px-6 mr-2"
                >
                  {mode === 'edite' ? 'Change' : 'Create'}
                </button>
                <button
                  onClick={handleClearPasswordsValues}
                  className="font-bold border-2 border-solid border-costum-clr_dark_blue text-costum-clr_dark_blue rounded-2xl py-1 px-6"
                >
                  Clear
                </button>
              </div>   
          </form>
          <p className={`text-error text-red-500 text-sm mt-2 bg-white ${textPasswordError !== '' ? 'p-2' : ''}`}>{textPasswordError}</p>
        </div>
      </div>
    </div>
  )
}

export default Admin_Profile