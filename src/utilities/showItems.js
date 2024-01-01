const showItems = (inputValue,selecCount,items)=>{

   const itemsFilterd =  items?.filter((item , index)=> {
        return (item.name?.toLowerCase() === inputValue?.toLowerCase() || item.name?.toLowerCase()?.includes(inputValue.toLowerCase())  )  && index <= selecCount
    });

    const itemsReduced = items?.filter((item , index)=> {
      return  index <= selecCount
   });
   
   if(inputValue === 'search' ||  !itemsFilterd || !itemsFilterd?.length) return itemsReduced 

   return itemsFilterd
}

export default showItems