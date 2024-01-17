import { useContext, useState } from "react";
import { ValidityContext } from "../contextApi";
import { useQuery } from "react-query";
import { addData, getData } from "../api";
import { 
  passwordValidation,
  arePasswordsIdentical,
  useCostumMutation,
  isAllDataExits
 } from "../utilities";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

//  <div>SignUp {validity}</div>

const SignUp = () => {
  const {validity , setValidity} = useContext(ValidityContext)

  const {mutate: addMutate} = useCostumMutation(addData,['users']) 


  const [isValidityPopupVisible , setIsValidityPopupVisible] = useState(false)
  const [textError,setTextError] = useState('')
  const [acceptTerms,setAcceptTerms] = useState(false)
  const [user,setUser] = useState({
    name:'',
    email:'',
    password:'',
    reTyepPassword:'',
    contact:'01147359396'
  })

  const navigate = useNavigate('')

  const handleClearValues = ()=>{
    const emptyUser = {
      name:'',
      contact:'',
      email:'',
      password:'',
      reTyepPassword:'',
    }
    setUser(emptyUser)
  }

  const handleAddUserQuery =  _=> {
    const id = crypto.randomUUID();
      const seletedData = 'users';
      const {password} = user
  
      const addedUser = {
        id:id,
        password,
        ...user
      }
       addMutate({seletedData:'users',...addedUser})
  }


  const handleSubmit = (e)=>{
    e.preventDefault()

    const passwordValidationObject = passwordValidation(user.password)
    const arePasswordsIdenticalObject = arePasswordsIdentical(user.password,user.reTyepPassword)
    
      if (!acceptTerms) {
        setTextError('you must Accept the Terms')
        return false
      }
    
      if (!isAllDataExits(user)) {
        setTextError('you must fill all inputs!')
        return false
      }

      if (!passwordValidationObject.isInputsTrue) {
        setTextError(passwordValidationObject.errors + 'In Password' )
        return false
      }

      if (!arePasswordsIdenticalObject.isInputsTrue) {
        setTextError(arePasswordsIdenticalObject.errors)
        return false
      }

      setIsValidityPopupVisible(true)
  }

  const handleChangeValues = (e)=>{
    const {name,value} = e.target;
    const newUser = {
      ...user,
      [name]:value
    }
    setUser(newUser)
    setTextError('')
  }


  const handleValidity = (e,costumValidity)=>{

    handleAddUserQuery()
    setValidity(costumValidity)

    if (costumValidity === 'admin') {
       navigate('/')
    }
    else if (costumValidity === 'user') {
      navigate('/home')
    }
    
    handleClearValues(e)
    
    setIsValidityPopupVisible(false)
  }

  return ( 
    <section className="flex bg-costum-clr_dark_white relative justify-center xl:gap-x-[150px] items-center">

      <div className={` absolute p-[25px] mb-2 w-full sm:w-[346px] sm:left-[30%] top-5 bg-white rounded-xl main-shadow ${isValidityPopupVisible ? 'block' : 'hidden' } `}>
        <p className="mb-2 leading-[30px] font-semibold">Move To Admin Email To have A Control Over Dashboard</p>
        <div className="flex justify-between">
        <button onClick={e=>handleValidity(e,'admin')} className="py-1 px-3 border border-solid border-[#eee] rounded-md text-green-600">
          OK
        </button>
        <button onClick={e=>handleValidity(e,'user')} className="py-1 px-3 border border-solid border-[#eee] rounded-md text-red-600">
          NO
        </button>
        </div>
      </div>
      
      <div className="w-full sm:w-[450px] pt-4 mx-auto lg:mx-0">
        <h1 className="pl-3 font-bold text-[36px] text-costum-clr_dark_blue">Sign-up</h1>
        <form onSubmit={handleSubmit} action="#" className="p-[25px] pt-[33px] mb-2 w-full">
          <label htmlFor="user-name" className="mb-[12px] block">
            <span className=" font-bold text-[24px] inline-block mb-1 text-costum-clr_dark_blue text-costum-clr_dark_blue">Username*</span>
            <input  value={user.name} onChange={handleChangeValues} type="text" name="name" className={`p-2 min-h-[54px] bg-white border-[3px] border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black read-only:text-[#777] font-medium w-full`}/>
          </label>     
          <label htmlFor="user-name" className="mb-[12px] block">
            <span className=" font-bold text-[24px] inline-block mb-1 text-costum-clr_dark_blue">Email Address*</span>
            <input  value={user.email} onChange={handleChangeValues}  type="email" name="email" className="p-2 min-h-[54px] bg-white border-[3px] border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black read-only:text-[#777] font-medium w-full"/>
          </label>
          <label htmlFor="user-name" className="mb-[12px] block">
            <span className=" font-bold text-[24px] inline-block mb-1 text-costum-clr_dark_blue">Create Password*</span>
            <input value={user.password} onChange={handleChangeValues}  type="password" name="password" className="p-2 min-h-[54px] bg-white border-[3px] border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black font-medium w-full"/>
          </label> 
          <label htmlFor="user-name" className="mb-[36px] block">
            <span className=" font-bold text-[24px] inline-block mb-1 text-costum-clr_dark_blue">Re-type Password*</span>
            <input value={user.reTyepPassword} onChange={handleChangeValues}  type="password" name="reTyepPassword" className="p-2 min-h-[54px] bg-white border-[3px] border-solid border-costum-clr_dark_blue outline-none rounded-lg  text-costum-clr_medium_black font-medium w-full"/>
          </label>
          <Link to='/' className=" text-costum-clr_dark_blue text-sm  block">- I have an Email</Link> 
          <p className={`text-error mb-2 text-red-500 text-sm mt-2  ${textError !== '' ? 'p-2' : ''}`}>{textError}</p>
          <div className="mt-[15px]">
            <button
              type="submit"
              className=" text-white w-full text-[32px] mb-[35px] font-bold bg-costum-clr_dark_blue rounded-3xl py-2 px-6"
            >
              Register
            </button>  
            <label htmlFor="change-mode" className="update-admin flex gap-[20px] items-center relative -mt-2 cursor-pointer bg-costum-clr_dark_white">
                <input onChange={e => setAcceptTerms(e.target.checked)}  name="change-mode" id="change-mode" type="checkbox" className="w-[20px] h-[20px] rounded-xl cursor-pointer  bg-costum-clr_dark_whit" />
                <span className="pt-1 text-[#2C2914]">
                  Accept all the Terms and Conditions
                </span>
            </label>   
          </div>   
        </form>
      </div>
      <div className=" hidden lg:block">
        <img src="/images/log.webp" alt="" />
      </div>
    </section>
  )
}

export default SignUp