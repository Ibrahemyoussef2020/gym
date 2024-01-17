import { useContext, useEffect, useRef, useState } from "react"
import { RememberMeContext, ValidityContext } from "../contextApi";
import { Link, useNavigate } from "react-router-dom";
import {
  useCostumMutation,
  isAllDataExits
} from '../utilities'
import { useQuery } from "react-query";
import { getData } from "../api";

import {
  rememberMeLocalStorage
} from '../localStorage'

let rememberMeParsing = {};

const SignIn = () => {
  const rememberMeRef = useRef()

  const {data:userQueryData} = useQuery(['users'],()=> getData('users'))
  const {data:adminQueryData} = useQuery(['admins'],()=> getData('admins'))

  const {validity , setValidity} = useContext(ValidityContext)
  const {rememberMe,setRememberMe} = useContext(RememberMeContext)

  const [textError,setTextError ] = useState('')
  const [textForgetDataError,setTextForgetDataError] = useState('')
  const [loginAsAdminAgreement,setLoginAsAdminAgreement] = useState(false)
  const [loginAsAdminAgreementText,setLoginAsAdminAgreementText] = useState('')
  const [isRememberMeChecked,setIsRememberMeChecked] = useState(false)
  const [isRememberMeImagesValid,setIsRememberMeImagesValid] = useState(false)
  const [didForgetPassword, setDidForgetPassword] = useState(false)

  const [user,setUser] = useState({
    email:'www.Main_Admin@Ibrahim.com',
    password:'Admin-Ibrahim-Youssef-123457'
  })
  const [userForgotData , setUserForgotData] = useState({
    contact:"01147359396",
    name:'',
    id:''
  })

  const navigate = useNavigate('')


  useEffect(()=>{
    if (rememberMe.length) {
      rememberMeParsing = JSON.parse(rememberMe) || {};
    }
    
    if (rememberMeParsing?.isSaved) {
      handleRememberMe()
      setIsRememberMeImagesValid(true)
    }
  },[validity])


 const handleClearValues = ()=>{
    const newUser = {
      email:'',
      password:''
    }
    setUser(newUser)
 } 


  const handleSubmitAdmin = _=>{
    let error = '';
    let result = true;

    const adminEmail = adminQueryData?.find(adminData => adminData.email === user.email)

    if (adminEmail) {
      if (adminEmail.password !== user.password) {
          error = 'Password is wrong!'
          result = false;
          return {
            error,
            result
          }
      }
    }
    else{
          error = 'No Email or Number Like this'
          result = false;
          return {
            error,
            result
          }
    }
    return {
      result,
      error
    }
  }


  const handleSubmitUser = _=>{
    let error = '';
    let result = true;

    const userEmail = userQueryData?.find(userData => userData.email === user.email)

    if (userEmail) {
      if (userEmail.password !== user.password) {
          error = 'Password is wrong!'
          result = false;

          return {
            error,
            result
          }
      }
    }
    else{
          error = 'No Email or Number Like this'
          result = false;
          return {
            error,
            result
          }
    }
    return {
      result,
      error
    }
  }

  
  const handleSubmit = (e)=>{
    e.preventDefault()

    const adminEmail = handleSubmitAdmin()
    const userEmail = handleSubmitUser()
    
      if (!isAllDataExits(user)) {
        setTextError('you must fill all inputs!')
        return false
      }

      if (!adminEmail.result && !userEmail.result) {
          if (adminEmail.error === 'Password is wrong!' || userEmail.error === 'Password is wrong!') {
            setTextError('Password is wrong!')
          }
          else{
            setTextError('No Email or Number Like this')
          }
        return false
      }

      if (adminEmail.result) {
        localStorage.setItem('validity','admin')
        setValidity(localStorage.getItem("validity"))
        
        if (isRememberMeChecked) {
          const newRememberMeAccount = {
            email:user.email,
            password:user.password,
            validity:'admin',
            isSaved:true,
          }
           localStorage.setItem('remember-me', JSON.stringify(newRememberMeAccount))
           setRememberMe(localStorage.getItem("remember-me"))
        }
      }

      if (userEmail.result) {
        localStorage.setItem('validity','user')
        setValidity(localStorage.getItem("validity"))
        
        if (isRememberMeChecked) {
          const newRememberMeAccount = {
            email:user.email,
            password:user.password,
            validity:'user',
            isSaved:true,
          }
           localStorage.setItem('remember-me', JSON.stringify(newRememberMeAccount))
           setRememberMe(localStorage.getItem("remember-me"))
        }

        if (loginAsAdminAgreementText === '') {
          setLoginAsAdminAgreement(true)
          return true
        }
      }

      navigate('/home')
      handleClearValues()
  }

 
  const handleChangeValues = e => {
    const {name,value} = e.target;
    const newUser = {
      ...user,
      [name]:value
    }
    setUser(newUser)
    setTextError('')
  }

  //---------------------- forget me and rememver me --------------//

  function handleForgetMe(e){
    if (e.target.checked) {
      const newRememberMeAccount = {
        email:'',
        password:'',
        validity:'',
        isSaved:false,
      }
       localStorage.setItem('remember-me', JSON.stringify(newRememberMeAccount))
       setRememberMe(localStorage.getItem("remember-me"))
       setIsRememberMeChecked(false)
       setTimeout(_=>setIsRememberMeImagesValid(false),150)
    }
  }


  function handleRememberMe(){
    setIsRememberMeChecked(rememberMeRef.current.checked) 
  }

  // -----------------------   forget data Methods ------------- //

  const handleChangeForgetDataValues = e => {
    const {name,value} = e.target;
    const newUser = {
      ...userForgotData,
      [name]:value
    }
    setUserForgotData(newUser)
    setTextError('')
  }



  const handleForgetDataSubmit = e => {
    e.preventDefault();

    let personAccount;
    const userAccount = userQueryData?.find(userData => userData.email === user.email)
    const adminAccount  = adminQueryData?.find(adminData => adminData.email === user.email)

    if (userAccount) {
      personAccount = userAccount
    }
    else if (adminAccount){
      personAccount = adminAccount
    }
    else{
      setTextForgetDataError('Your email is not exist , please create an account or call the admin for support')
    }

    if (personAccount != null) {
      if (
            personAccount.contact == userForgotData.contact &&
            personAccount.id === userForgotData.id &&
            personAccount.name === userForgotData.name
        ) {
  
      const userWithPassword = {
        ...user,
        password:personAccount.password
      }

        setUser(userWithPassword)
        setDidForgetPassword(false)
      }else{
        setTextForgetDataError('Your Data is Wrong , please create an account or call the admin for support')
      }   
    }
    
  }

  function handleForgetPassword(e){
    e.preventDefault()
    setDidForgetPassword(true)
  }

  // -----------------------   change to admin Methods ------------- //

  const agreeToChangeToAdminEmail = _=>{
    const ibrahimEmail = {
      email:'www.Main_Admin@Ibrahim.com',
      password:'Admin-Ibrahim-Youssef-123457'
    }
    setUser(ibrahimEmail)
    setDidForgetPassword(false)
    setLoginAsAdminAgreementText('Yes')
    setLoginAsAdminAgreement(false)
  }

  const refuseToChangeToAdminEmail = _=>{
    setLoginAsAdminAgreementText('No')
    setLoginAsAdminAgreement(false)
  }

  return (
    <section className="flex justify-center items-center relative xl:gap-x-[150px] bg-costum-clr_dark_white">

    <div className={`absolute top-0 left-0 right-0  bottom-0 z-50 bg-white flex-col gap-5 justify-center items-center ${isRememberMeImagesValid ? 'flex' : 'hidden'}`}>
      <Link to='/home'>
        <img src="/images/user.jpg" alt="Continue"  className="w-[250px] h-[250px] p-2 rounded-full bg-white border border-solid border-[#ccc]"/>
      </Link>
      <label htmlFor="forget-me" className="update-admin flex gap-[10px] items-center relative -mt-2 cursor-pointer">
        <input onChange={handleForgetMe}  name="forget-me" id="forget-me" type="checkbox" className="w-[20px] h-[20px] rounded-xl cursor-pointer  bg-costum-clr_dark_whit" />
        <span className="pt-1 text-[#77749B]">
          Forget me
        </span>
      </label>
    </div>

    <div className={` absolute z-[1000] p-[25px] mb-2 w-full sm:w-[346px] sm:left-[30%] top-5 bg-white rounded-xl main-shadow ${loginAsAdminAgreement ? 'block' : 'hidden' } `}>
        <p className="mb-2 leading-[30px] font-semibold">Move To Admin Email To have A Control Over Dashboard</p>
        <div className="flex justify-between">
        <button onClick={agreeToChangeToAdminEmail} className="py-1 px-3 border border-solid border-[#eee] rounded-md text-green-600">
          OK
        </button>
        <button onClick={refuseToChangeToAdminEmail} className="py-1 px-3 border border-solid border-[#eee] rounded-md text-red-600">
          NO
        </button>
        </div>
      </div>

      <div className={`absolute z-[500] top-0 left-0 bottom-0 right-0 ${didForgetPassword ? 'block' : 'hidden'} bg-white`}>
       
       <div className="flex justify-between items-center pr-5 sm:pr-7 mt-4">
        <button className=" text-xl my-3 pl-5" onClick={_=>setLoginAsAdminAgreement(true)}>
          Login By admin Email <i className="fa-solid fa-arrow-right-long"></i>
        </button>
        <button className="text-2xl" onClick={_=>setDidForgetPassword(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button> 
       </div>

        <form  onSubmit={handleForgetDataSubmit} action="#" className="p-[25px] pt-5 mb-2 w-full">
            <p className="mb-4">Or Try to recover the password</p>
            <label htmlFor="contact" className="mb-[12px] block">
              <span className=" font-bold text-[24px] inline-block mb-1">Contact*</span>
              <input value={userForgotData.contact} onChange={handleChangeForgetDataValues}  type="number" name="contact" id="contact" className="p-2 bg-white border-2 border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black read-only:text-[#777] font-medium w-full"/>
            </label>
            <label htmlFor="id" className="mb-[12px] block">
              <span className=" font-bold text-[24px] inline-block mb-1">id*</span>
              <input value={userForgotData.id} onChange={handleChangeForgetDataValues}  type="text" name="id" id="id" className="p-2 bg-white border-2 border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black font-medium w-full"/>
            </label>
            <label htmlFor="name" className="mb-[12px] block">
              <span className=" font-bold text-[24px] inline-block mb-1">Name*</span>
              <input value={userForgotData.name} onChange={handleChangeForgetDataValues}  type="text" name="name" id="name" className="p-2 bg-white border-2 border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black font-medium w-full"/>
            </label>
            <a href="tel:01147359396"  className=" text-lg text-costum-clr_dark_blue font-bold flex items-center gap-2  my-4">
              <i className="fa-solid fa-mobile-screen"></i>
              <span>Or call Admin Ibrahim </span>
            </a>
            <p className={`text-error mb-2 text-red-500 text-sm mt-2  ${textForgetDataError !== '' ? 'p-2' : ''}`}>{textForgetDataError}</p>
            <button type="submit" className="text-white w-full text-[20px] sm:text-[32px] mb-[35px] font-bold bg-costum-clr_dark_blue rounded-3xl py-2 px-6">
              Get the password
            </button>
        </form>
      </div>

      <div className="w-full sm:w-[450px] pt-4  mx-auto lg:mx-0">
        <h1 className="pl-3 font-bold text-[36px] text-costum-clr_dark_blue">Sign-in</h1>
        <form onSubmit={handleSubmit} action="#" className="p-[25px] pt-[55px] mb-2 w-full">   
          <label htmlFor="email" className="mb-[16px] block">
            <span className=" font-bold text-[24px] text-costum-clr_medium_blue inline-block mb-1">Email*</span>
            <input  value={user.email} onChange={handleChangeValues}  type="email" name="email" id="email" className="text-xl font-bold p-2 min-h-[69px] bg-white border-[3px] border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black read-only:text-[#777] w-full"/>
          </label>
          <label htmlFor="name" className="mb-[12px] block">
            <span className="font-bold text-[24px] text-costum-clr_medium_blue inline-block mb-1">Password*</span>
            <input value={user.password} onChange={handleChangeValues}  type="password" name="password" id="password"  className=" text-xl font-bold p-2 min-h-[69px] bg-white border-[3px] border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black read-only:text-[#777] w-full"/>
          </label>
          <div className="flex justify-between mt-[40px] mb-[20px]">
            <label htmlFor="remember-me" className="update-admin flex gap-[10px] items-center relative -mt-2 cursor-pointer bg-costum-clr_dark_white">
              <input ref={rememberMeRef} onChange={handleRememberMe}  name="remember-me" id="remember-me" type="checkbox" className="w-[20px] h-[20px] rounded-xl cursor-pointer  bg-costum-clr_dark_whit" />
              <span className="pt-1 text-[#77749B]">
                Remember me
              </span>
            </label>
            <button className=" text-costum-clr_dark_blue" onClick={handleForgetPassword}>
              Forgot Password?
            </button> 
          </div>
          <Link to='/sign-up' className=" text-costum-clr_dark_blue text-sm  block">- Or create an Email</Link> 
          <p className={`text-error mb-2 text-red-500 text-sm mt-2  ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
          <div className="mt-[15px]">
            <button
              type="submit"
              className=" text-white w-full text-[32px] mb-[35px] font-bold bg-costum-clr_dark_blue rounded-3xl py-2 px-6"
            >
              Login
            </button>    
          </div>   
        </form>
      </div>
      <div className=" hidden lg:block">
        <img src="/images/log.webp" alt="" />
      </div>
    </section>
  )
}

export default SignIn