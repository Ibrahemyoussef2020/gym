
import {
Numbers,
Lowercase,
Uppercase,
SpicialCar
} from './characterList'

export const arePasswordsDifferent = (oldPassword,newPassword)=>{
    let errors = '';
    let isInputsTrue = true

    if (oldPassword === newPassword) {

        errors = 'old password and new password must be different';
        isInputsTrue = false
    }
    return {
        errors,
        isInputsTrue
    }
}


export const arePasswordsIdentical = (password,retypePassword)=>{
    let errors = '';
    let isInputsTrue = true   

    if (password !== retypePassword) {
        errors = 'You must re type the same password';
        isInputsTrue = false
    }

    return {
        errors,
        isInputsTrue
    }

}


export const passwordValidation = (values)=>{
    let errors = '';
    let isInputsTrue = true
    
   const Uppervalue = values.split('').filter(v =>/[A-Z]/.test(v)=== true)
   const Lowervalue = values.split('').filter(v => /[a-z]/.test(v))
   const NumbValue  = values.split('').filter(v => /[0-9]/.test(v))
   const Spicieal    = values.split('').filter(v => SpicialCar.split('').find(s => s === v))
   if(NumbValue < 2) errors +=  '2 number, '
   
   if(Uppervalue.length < 2) errors += '2 upper, '
   
   if(Lowervalue.length < 2) errors += '2 lower ,'
   
   if(Spicieal.length < 2) errors += '2 character, '

   
   if (errors !== '') {
        isInputsTrue = false
        errors = `Sory : must have ${errors}`
   }

    return {
        errors,
        isInputsTrue
    }
}

