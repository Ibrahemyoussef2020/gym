const rememberMeAccount = {
    email:'',
    password:'',
    validity:'',
    isSaved:false
}

const validityLocalStorage = localStorage.getItem('validity') || 'admin';
const rememberMeLocalStorage = JSON.parse(localStorage.getItem('remember-me')) || rememberMeAccount;

export {
    validityLocalStorage,
    rememberMeLocalStorage
}