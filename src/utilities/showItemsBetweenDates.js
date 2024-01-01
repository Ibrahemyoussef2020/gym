import showItems from "./showItems";

const showItemsBetweenDates = (fromDateTime,toDateTime,inputValue,selecCount,list)=>{
  
   const newList = [];
   let amountList = 0;

   if (!fromDateTime|| !toDateTime || fromDateTime === '' || toDateTime === '') {
      if (list && list.length) {
         amountList = list.reduce((acc,cur) => +acc.price + +cur.price ,0)
      }

      const newList = showItems(inputValue,selecCount,list);
      return {
         newList,
         amountList:''
        }
   }


      list.map(item => {
            const itemStringDate = item?.date;
            const itemDate = new Date(itemStringDate)
            const itemDateTime = itemDate.getTime()

            if (itemDateTime >=  fromDateTime && itemDateTime <=  toDateTime) {
                newList.push(item)
                amountList += +item.price
            }
      })
  
   return {
    newList:showItems(inputValue,selecCount,newList),
    amountList
   }
}

export default showItemsBetweenDates