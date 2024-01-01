
export const selectDate = (num = 1,date) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + num)

  return  currentDate.toDateString()
  
}

export const selectNumaricDate = (num = 1,date) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + num)
  return  currentDate.toDateString()
  
}


export const selectDateMonth = (date,limit) => {
    const startDate = new Date(date);
    const startMonth = startDate.toLocaleString('fr-FR', { month: 'long' })


    const endDate = startDate.setMonth(startDate.getMonth()+ limit);
    const endMonthInNumber = new Date(endDate);
    const endMonth = endMonthInNumber.toLocaleString('fr-FR', { month: 'long' })

    const returnedDate = {
        startDate:startMonth,
        endDate:endMonth
    }

    return returnedDate
}


export const selectDateToMonth = (date,limit) => {
  const startDate = new Date(date);
  const startMonth = startDate.toLocaleString('fr-FR', { month: 'long' })
  

  const startAndEndDay = startDate.getDay()


  const endDate = startDate.setMonth(startDate.getMonth()+ limit);
  const endMonthInNumber = new Date(endDate);
  const endMonth = endMonthInNumber.toLocaleString('fr-FR', { month: 'long' })

  const returnedDate = {
      startDate:`${startMonth[0].toUpperCase()}${startMonth.slice(1,3)} ${startAndEndDay}`,
      endDate:`${endMonth[0].toUpperCase()}${endMonth.slice(1,3)} ${startAndEndDay}`
  }

  return returnedDate
}


export const selectMonthInEnglish = (date)=>{
  const fullDate = new Date(date);
  const month = fullDate.toLocaleString('fr-FR', { month: 'long' })
  
  return `${month[0]?.toUpperCase()}${month?.slice(1)}`
}



