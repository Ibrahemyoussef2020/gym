const isAllDataExits = (checkedObject) => {
  return  Object.values(checkedObject).every(inputValue =>{
    return inputValue !== ''
  })
}

export default isAllDataExits