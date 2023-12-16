import { useContext } from "react"
import { ValidityContext } from "../contextApi";

const SignIn = () => {
  const context = useContext(ValidityContext)
  const {setValidity} = context
  const {validity} = context

  console.log(validity);

  return (
    <div>SignIn
      <div>
        <button onClick={_=>setValidity('user')}>User</button>  
      </div>
      <div>
      <button onClick={_=>setValidity('admin')}>Admin</button>
      </div>
    </div>
  )
}

export default SignIn