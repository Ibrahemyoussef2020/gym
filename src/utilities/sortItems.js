import React from 'react'

const sortItems = (list,isReversed=false) => {

    let sortedList = [];

    if (isReversed) {
        sortedList = list.reverse() 
    }else{
        sortedList = list
    }

  return (
   sortedList
  )
}

export default sortItems