import {React, useState} from 'react'

const App = () => {
  const [name,setName]=useState("")
  const [check,setCheck]=useState(false)
  const [interest,setInterest]=useState("")

  function getFormData(e)
  {
    console.log(name,check,interest)
    e.preventDefault()
  }
  
  return (
    <div className='App'>
      <h1>Form</h1>
      <form onSubmit={getFormData}>
        <input type="text" placeholder='Enter Text' onChange={(e)=>setName(e.target.value)}/> <br/> <br/>
        <select onChange={(e)=>setInterest(e.target.value)}>
          <option>Select Option</option>
          <option>Marvel</option>
          <option>DC</option>
        </select><br/> <br/> 
          <input type='checkbox' onChange={(e)=>setCheck(e.target.checked)} /> <span>Accept Terms and Condition</span>
          <br /><br />
          <button>Submit</button>
      </form>
    </div>
  )
}

export default App
