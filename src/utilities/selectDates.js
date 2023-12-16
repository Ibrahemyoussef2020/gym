
export const selectDate = (num = 1) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + num)

  return  currentDate.toDateString()
  
}
// need to modify
export const selectNumaricDate = (num = 1) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + num)

  return  currentDate.toDateString()
  
}

export const selectDateMonth = (num) => {
    const currentDate = new Date(num);
    const month = currentDate.toLocaleString('default', { month: 'long' })

    return month
  
}
// need to modify
export const selectDateToMonth = (num) => {
    const currentDate = new Date(num);
    const month = currentDate.toLocaleString('default', { month: 'long' })

    return month
  
}