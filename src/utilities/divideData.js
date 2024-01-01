const divideData = (items) => {
   const dividedList = []; 
  
   const pagesCount  = Math.ceil(items?.length / 4 || 0);
   let first = 0;
   let last = 4;
   
    {new Array(pagesCount).fill("").map((_, i) => {
      const page =  items.filter((item,index) => index >= first && index < last)
      dividedList.push(page)
      first = first + 4;
      last = last + 4;          
    })}

    return dividedList
   
}

export default divideData