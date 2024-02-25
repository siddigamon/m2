import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
  const [employee, setEmployees] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    addressline: '',
    barangay: '',
    province: '',
    country: '',
    zipcode: ''
  })

  const handleChange = (e) => {
    setEmployees((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const navigate = useNavigate()

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/employees",employee) 
      navigate('/') 
    } catch(err){
      console.log(err)
    }
  }

  console.log(employee)
  return (
    <div className='form'> 
      <h1>Add New Employee</h1>
      <input type = "text" placeholder = "First Name"  onChange={handleChange} name ="firstname"/>
      <input type = "text" placeholder = "Middle Name" onChange={handleChange} name="middlename"/>
      <input type = "text" placeholder = "Last Name" onChange={handleChange} name="lastname"/>
      <input type = "text" placeholder = "Address Line" onChange={handleChange} name="addressline"/>
      <input type = "text" placeholder = "Barangay" onChange={handleChange} name="barangay"/>
      <input type = "text" placeholder = "Province" onChange={handleChange} name="province"/>
      <input type = "text" placeholder = "Country" onChange={handleChange} name="country"/>
      <input type = "text" placeholder = "Zipcode" onChange={handleChange} name="zipcode"/>
      <button className="formButton" onClick={handleClick}>Add Employee</button>
    </div>
  )
}

export default Add